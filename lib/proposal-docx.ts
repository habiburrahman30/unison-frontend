import {
    AlignmentType,
    BorderStyle,
    Document,
    Paragraph,
    Table,
    TableCell,
    TableRow,
    TextRun,
    WidthType,
    type IBorderOptions,
    type IParagraphOptions,
    type ITableCellOptions,
} from "docx";
import { formatDocNumber } from "@/lib/currency";

export interface ProposalDocxVariant {
    description: string;
    unit: string;
    qty: number;
    unitPrice: number;
}

export interface ProposalDocxItem {
    name: string;
    model: string;
    brand: string;
    manufacturer: string;
    origin: string;
    specNote: string;
    warrantyType: string;
    variants: ProposalDocxVariant[];
}

export interface ProposalDocxInput {
    offerDate: string;
    proposalRef: string;
    recipientCompany: string;
    recipientAttention: string;
    recipientAddress: string;
    subject: string;
    deliveryTerms: string;
    currency: string;
    validity: string;
    introText: string;
    closingNote: string;
    items: ProposalDocxItem[];
    installation: {
        description: string;
        unit: string;
        qty: number;
        unitPrice: number;
        total: number;
    };
    tdsVds: number;
    subtotal: number;
    taxAmount: number;
    grandTotal: number;
    amountInWords: string;
    signatory: { name: string; position: string; phone: string | null; email: string | null } | null;
}

// Builds the same Office Open XML (.docx) document as the "Download as DOC" button,
// as a pure function so it can run identically on the client or the server.
export function buildProposalDocx(data: ProposalDocxInput): Document {
    const {
        offerDate,
        proposalRef,
        recipientCompany,
        recipientAttention,
        recipientAddress,
        subject,
        deliveryTerms,
        currency,
        validity,
        introText,
        closingNote,
        items,
        installation,
        tdsVds,
        subtotal,
        taxAmount,
        grandTotal,
        amountInWords,
        signatory,
    } = data;

    const noBorder: IBorderOptions = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
    const thinBorder: IBorderOptions = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
    const noCellBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
    const boxCellBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

    const P = (children: TextRun[], opts: Partial<IParagraphOptions> = {}) =>
        new Paragraph({ children, spacing: { after: 120 }, ...opts });
    const B = (text: string) => new TextRun({ text, bold: true });
    const N = (text: string) => new TextRun({ text });
    const blank = () => new Paragraph({ text: "" });
    const cell = (children: Paragraph[], opts: Partial<ITableCellOptions> = {}) =>
        new TableCell({ children, borders: boxCellBorders, margins: { top: 60, bottom: 60, left: 100, right: 100 }, ...opts });

    const origins = Array.from(new Set(items.map((it) => it.origin.trim()).filter(Boolean)));
    const originLabel = origins.length ? `, Origin: ${origins.join(" & ")}` : "";
    const addressLines = recipientAddress.split("\n").map((l) => l.trim()).filter(Boolean);

    const bodyParagraphs: (Paragraph | Table)[] = [
        P([N(`Date: ${offerDate}`)]),
        blank(),
        P([B("To")]),
        ...(recipientAttention ? [P([B(recipientAttention)])] : []),
        P([B(recipientCompany)]),
        ...addressLines.map((l) => P([B(l)])),
        blank(),
    ];

    bodyParagraphs.push(
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideHorizontal: noBorder, insideVertical: noBorder },
            rows: [
                new TableRow({
                    children: [
                        cell([P([N("Subject:")])], { borders: noCellBorders, width: { size: 20, type: WidthType.PERCENTAGE } }),
                        cell([P([B(subject)])], { borders: noCellBorders }),
                    ],
                }),
                new TableRow({
                    children: [
                        cell([P([N("Our Offer No :")])], { borders: noCellBorders }),
                        cell([P([N(proposalRef)])], { borders: noCellBorders }),
                    ],
                }),
            ],
        })
    );

    bodyParagraphs.push(
        blank(),
        P([N("Dear Sir,")]),
        blank(),
        ...introText.split(/\n{2,}/).flatMap((para) => [P([N(para)]), blank()]),
        P([
            N("We made this offer on "),
            B(deliveryTerms),
            N(
                " basis. Machine will be supplied in brand new condition and installation will be done as in offer instruction. If you have any query on any point, let us know to clarify further. We look forward for your favorable response."
            ),
        ]),
        blank(),
        P([N(closingNote)]),
        blank(),
        blank(),
        blank(),
        P([B(signatory?.name || "")]),
        P([B(signatory?.position || "")]),
        P([B("Unison Biz Ltd.")]),
        P([B(`Mob: ${signatory?.phone || signatory?.email || ""}`)])
    );

    bodyParagraphs.push(
        new Paragraph({
            pageBreakBefore: true,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({ text: `Price Proposal for ${subject || "Equipment"}${originLabel}:`, underline: {}, bold: true, size: 28 })],
        })
    );

    const headerRow = new TableRow({
        tableHeader: true,
        children: [
            cell([P([B("S/N")], { alignment: AlignmentType.CENTER })], { width: { size: 6, type: WidthType.PERCENTAGE } }),
            cell([P([B("PRODUCT DESCRIPTION")], { alignment: AlignmentType.CENTER })], { width: { size: 48, type: WidthType.PERCENTAGE } }),
            cell([P([B("Unit")], { alignment: AlignmentType.CENTER })], { width: { size: 8, type: WidthType.PERCENTAGE } }),
            cell([P([B("QTY")], { alignment: AlignmentType.CENTER })], { width: { size: 8, type: WidthType.PERCENTAGE } }),
            cell([P([B("Unit Price")], { alignment: AlignmentType.CENTER }), P([B(`In ${currency}.`)], { alignment: AlignmentType.CENTER })], {
                width: { size: 15, type: WidthType.PERCENTAGE },
            }),
            cell([P([B("Total Price")], { alignment: AlignmentType.CENTER }), P([B(`In ${currency}.`)], { alignment: AlignmentType.CENTER })], {
                width: { size: 15, type: WidthType.PERCENTAGE },
            }),
        ],
    });

    const itemRows: TableRow[] = [];
    let sn = 0;
    items.forEach((it) => {
        const validVariants = it.variants.filter((v) => v.description.trim() || (Number(v.unitPrice) || 0) > 0);
        validVariants.forEach((v, vi) => {
            sn += 1;
            const descParagraphs: Paragraph[] = [];
            if (vi === 0) {
                descParagraphs.push(P([B("Product Name: "), N(it.name || v.description)], { spacing: { after: 40 } }));
                if (it.model.trim()) descParagraphs.push(P([B("Model: "), N(it.model)], { spacing: { after: 40 } }));
                if (it.brand.trim()) descParagraphs.push(P([B("Brand: "), N(it.brand)], { spacing: { after: 40 } }));
                if (it.manufacturer.trim()) descParagraphs.push(P([B("Manufacturer: "), N(it.manufacturer)], { spacing: { after: 40 } }));
                if (it.origin.trim()) descParagraphs.push(P([B("Origin: "), N(it.origin)], { spacing: { after: 40 } }));
                descParagraphs.push(P([B(`${it.warrantyType}: `), N("As per Terms & Condition")], { spacing: { after: 40 } }));
                if (it.specNote.trim()) {
                    it.specNote.split("\n").forEach((line) => descParagraphs.push(P([N(line)], { spacing: { after: 40 } })));
                }
                if (validVariants.length > 1) descParagraphs.push(P([B("Variant: "), N(v.description)], { spacing: { after: 40 } }));
            } else {
                descParagraphs.push(P([N(v.description || it.name)], { spacing: { after: 40 } }));
            }
            itemRows.push(
                new TableRow({
                    children: [
                        cell([P([N(String(sn).padStart(2, "0"))], { alignment: AlignmentType.CENTER })]),
                        cell(descParagraphs),
                        cell([P([N(v.unit)], { alignment: AlignmentType.CENTER })]),
                        cell([P([N(String(Number(v.qty) || 0))], { alignment: AlignmentType.CENTER })]),
                        cell([P([N(formatDocNumber(Number(v.unitPrice) || 0, currency))], { alignment: AlignmentType.RIGHT })]),
                        cell([P([B(formatDocNumber((Number(v.qty) || 0) * (Number(v.unitPrice) || 0), currency))], { alignment: AlignmentType.RIGHT })]),
                    ],
                })
            );
        });
    });

    if (installation.total > 0 || installation.description.trim()) {
        sn += 1;
        const descParagraphs = [P([B("Installation & Commissioning Charge")], { spacing: { after: 40 } })];
        if (installation.description.trim()) descParagraphs.push(P([N(installation.description)], { spacing: { after: 40 } }));
        itemRows.push(
            new TableRow({
                children: [
                    cell([P([N(String(sn).padStart(2, "0"))], { alignment: AlignmentType.CENTER })]),
                    cell(descParagraphs),
                    cell([P([N(installation.unit)], { alignment: AlignmentType.CENTER })]),
                    cell([P([N(String(Number(installation.qty) || 0))], { alignment: AlignmentType.CENTER })]),
                    cell([P([N(formatDocNumber(Number(installation.unitPrice) || 0, currency))], { alignment: AlignmentType.RIGHT })]),
                    cell([P([B(formatDocNumber(installation.total, currency))], { alignment: AlignmentType.RIGHT })]),
                ],
            })
        );
    }

    if (!itemRows.length) {
        itemRows.push(
            new TableRow({
                children: [cell([P([N("No items added")], { alignment: AlignmentType.CENTER })], { columnSpan: 6 })],
            })
        );
    }

    bodyParagraphs.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [headerRow, ...itemRows] }));

    bodyParagraphs.push(
        new Table({
            alignment: AlignmentType.RIGHT,
            width: { size: 45, type: WidthType.PERCENTAGE },
            borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideHorizontal: noBorder, insideVertical: noBorder },
            rows: [
                new TableRow({
                    children: [
                        cell([P([N(`Total Price excluding Vat & Tax ${currency}:`)])], { borders: noCellBorders }),
                        cell([P([N(formatDocNumber(subtotal, currency))], { alignment: AlignmentType.RIGHT })], { borders: noCellBorders }),
                    ],
                }),
                new TableRow({
                    children: [
                        cell([P([N(`TDS & VDS (${Number(tdsVds) || 0}%)`)])], { borders: noCellBorders }),
                        cell([P([N(formatDocNumber(taxAmount, currency))], { alignment: AlignmentType.RIGHT })], { borders: noCellBorders }),
                    ],
                }),
                new TableRow({
                    children: [
                        cell([P([B(`Grand Total ${currency}`)])], { borders: { ...noCellBorders, top: thinBorder } }),
                        cell([P([B(formatDocNumber(grandTotal, currency))], { alignment: AlignmentType.RIGHT })], {
                            borders: { ...noCellBorders, top: thinBorder },
                        }),
                    ],
                }),
            ],
        })
    );

    bodyParagraphs.push(
        P([B(`Total ${currency === "USD" ? "Amount" : "Taka"}: ${amountInWords}`)]),
        blank(),
        new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: "Terms and Condition:", bold: true, size: 24 })] })
    );

    const term = (n: number, title: string, body: string) => P([B(`${n}. ${title}: `), N(body)], { spacing: { after: 160 } });
    const subTerm = (label: string, body: string) => P([N(`${label} ${body}`)], { indent: { left: 480 }, spacing: { after: 80 } });

    bodyParagraphs.push(
        P([B("1. PAYMENT TERMS:")], { spacing: { after: 60 } }),
        subTerm("(i)", `Offered Price based on "${deliveryTerms}" basis.`),
        subTerm("(ii)", "100% payment to be made to UNISON BIZ LIMITED."),
        subTerm(
            "(iii)",
            "100% Payment to be made to M/S Unison Biz Limited. 70% payment as advance with the confirmed work order, 20% payment will be made when goods arrive at CTG Port & rest 10% after successful installation within 30 days."
        ),
        subTerm(
            "(iv)",
            "Price includes all import taxes, duties etc. up to installation site and all bank charges (foreign and local). Price are Excluded from VAT and AIT at source."
        ),
        term(2, "VALIDITY", `This offer is valid up to ${validity} from the date hereon.`),
        term(
            3,
            "DELIVERY",
            "Delivery will be made within 8-10 weeks day from the date of your acceptable work order and subject to making payments complying/fulfilling our payment terms mentioned in this offer and agreed there upon. Delivery notification will be served 1-3 days before the date of delivery. Unless otherwise mentioned in this offer, delivery notification will be effective and delivery will take place subject to completion total payment."
        ),
        term(
            4,
            "WARRANTEE",
            "All the customers of Unison Biz Limited enjoy full international warranty as specified against each item from the date of installation. Warranty does not cover accessories, consumables and items with specific life time like batteries."
        ),
        term(
            5,
            "INSTALLATION & COMMISSIONING",
            "Proper Installation & Commissioning is the prerequisite for possible warranty claim and our principal approves our service team and for which our charge is mentioned in price offer. You are however have to provide a suitable place for the store and space for the accommodation of our project technicians for installation & commissioning as per our engineer's recommendations. Any kind of civil and electrical work should be done by Customer like Plant room, Electrical SDB board e.t.c. Any kind of electrical support should be provided by customer to do the installation work."
        ),
        term(
            6,
            "SPARES & SERVICE BACK UP",
            "By being in the vicinity of customers, we do extend our service facilities to all of our clients for which we are equipped with all the service potentialities including all the specialized tools, service van, skilled and experienced service team headed by graduate engineers trained by our principal. We keep most of the fast moving spare at stock and maintenance tools at our fingertip. For slow moving spares from manufacturer, we use fastest possible means of transport to support our customers."
        ),
        term(
            7,
            "RISK FACTORS",
            "During the installation time we may face some problem/risk like ROBBERY. Customer should provide all kind of Project security to secure the project and any kind of losses for the Risk factors should compensate by the Customer. Factors: Robbery. Product loss due to site condition. Any kind of losses due to civil construction work. Excess of work quantity. Any kind of Excess work's price should be adjusting from the unit price of the offer."
        ),
        P([B("8. IMMEDIATE CONTACT / HOTLINE")], { spacing: { after: 60 } }),
        P(
            [
                N(
                    `${signatory?.name || ""}, ${signatory?.position || ""}, Unison Biz Limited, Mobile: ${signatory?.phone || ""}${
                        signatory?.email ? `, Email: ${signatory.email}.` : "."
                    }`
                ),
            ],
            { indent: { left: 480 } }
        )
    );

    return new Document({
        sections: [
            {
                properties: {},
                children: bodyParagraphs,
            },
        ],
    });
}
