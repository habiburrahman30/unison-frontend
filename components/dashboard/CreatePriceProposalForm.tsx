"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

interface ProductLite {
    id: number;
    name: string;
    manufacturer: string;
    country_of_origin: string;
    product_description: string;
    technical_description: string | null;
    price: number;
    brand?: { name: string } | null;
}

interface TeamMemberLite {
    id: number;
    name: string;
    position: string;
    phone: string | null;
    email: string | null;
    image: string | null;
}

interface VariantRow {
    id: string;
    description: string;
    unit: string;
    qty: number;
    unitPrice: number;
}

interface LineItemState {
    id: string;
    name: string;
    brand: string;
    manufacturer: string;
    origin: string;
    specNote: string;
    autoFilled: boolean;
    specsOpen: boolean;
    variants: VariantRow[];
    query: string;
    results: ProductLite[];
    searching: boolean;
    showResults: boolean;
}

const UNIT_OPTIONS = ["Set", "Nos", "Pcs", "Meter", "Job", "Unit"];

const DELIVERY_TERMS = [
    { value: "Free Delivery", label: "Free Delivery (Standard)" },
    { value: "CFR", label: "CFR (Cost & Freight)" },
    { value: "FOB", label: "FOB (Free on Board)" },
    { value: "CIF", label: "CIF (Cost, Insurance, Freight)" },
    { value: "EXW", label: "EXW (Ex Works)" },
];

const VALIDITY_OPTIONS = ["30 Calendar Days", "60 Calendar Days", "90 Calendar Days"];

let uidCounter = 0;
const nextId = () => `id-${Date.now()}-${uidCounter++}`;

const emptyVariant = (): VariantRow => ({
    id: nextId(),
    description: "",
    unit: "Set",
    qty: 1,
    unitPrice: 0,
});

const emptyLineItem = (): LineItemState => ({
    id: nextId(),
    name: "",
    brand: "",
    manufacturer: "",
    origin: "",
    specNote: "",
    autoFilled: false,
    specsOpen: true,
    variants: [emptyVariant()],
    query: "",
    results: [],
    searching: false,
    showResults: false,
});

const formatBDT = (n: number) => {
    const safe = Number.isFinite(n) ? n : 0;
    return `৳ ${safe.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const twoDigitsWords = (n: number): string => {
    if (n < 20) return ONES[n];
    const t = Math.floor(n / 10);
    const r = n % 10;
    return TENS[t] + (r ? ` ${ONES[r]}` : "");
};

const threeDigitsWords = (n: number): string => {
    const h = Math.floor(n / 100);
    const r = n % 100;
    const parts: string[] = [];
    if (h) parts.push(`${ONES[h]} Hundred`);
    if (r) parts.push(twoDigitsWords(r));
    return parts.join(" ");
};

// Bangladeshi numbering system: Crore / Lac / Thousand
const numberToWordsBDT = (amount: number): string => {
    let n = Math.round(amount);
    if (n <= 0) return "Zero Taka Only.";

    const crore = Math.floor(n / 1e7);
    n %= 1e7;
    const lac = Math.floor(n / 1e5);
    n %= 1e5;
    const thousand = Math.floor(n / 1e3);
    n %= 1e3;
    const rest = n;

    const parts: string[] = [];
    if (crore) parts.push(`${threeDigitsWords(crore)} Crore`);
    if (lac) parts.push(`${threeDigitsWords(lac)} Lac`);
    if (thousand) parts.push(`${threeDigitsWords(thousand)} Thousand`);
    if (rest) parts.push(threeDigitsWords(rest));

    return `${parts.join(" ")} Taka Only.`;
};

const escapeHtml = (str: string) =>
    String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

const initialsOf = (name: string) =>
    name.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

export default function CreatePriceProposalForm() {
    const [offerDate] = useState(() => new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
    const [proposalRef, setProposalRef] = useState(() => {
        const d = new Date();
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        return `UBL-CLIENT-${dd}${mm}${d.getFullYear()}`;
    });

    const [recipientCompany, setRecipientCompany] = useState("");
    const [recipientAttention, setRecipientAttention] = useState("");
    const [recipientAddress, setRecipientAddress] = useState("");

    const [subject, setSubject] = useState("");
    const [deliveryTerms, setDeliveryTerms] = useState("Free Delivery");
    const [validity, setValidity] = useState(VALIDITY_OPTIONS[0]);
    const [warranty, setWarranty] = useState("12 Months Free Comprehensive");

    const [introText, setIntroText] = useState(
        "Thank you for your interest in the products we deal in. UNISON BIZ LIMITED is pleased to submit this proposal covering the scope of supply you requested. We have extensive experience working with government and private institutions in Bangladesh, ensuring reliability, quality, and responsive after-sales service."
    );
    const [closingNote, setClosingNote] = useState(
        "We look forward to your favorable response. If you have any query on any point, please let us know so we can clarify further."
    );

    const [items, setItems] = useState<LineItemState[]>([emptyLineItem()]);

    const [installDesc, setInstallDesc] = useState("");
    const [installNote, setInstallNote] = useState("");
    const [installUnit, setInstallUnit] = useState("Job");
    const [installQty, setInstallQty] = useState(1);
    const [installPrice, setInstallPrice] = useState(0);

    const [tdsVds, setTdsVds] = useState(15);

    const [teams, setTeams] = useState<TeamMemberLite[]>([]);
    const [signatoryId, setSignatoryId] = useState<number | null>(null);
    const [loadingTeams, setLoadingTeams] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);

    const searchTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const res = await fetch("/api/teams?limit=100");
                const json = await res.json();
                if (active && res.ok) {
                    const members: TeamMemberLite[] = json?.data?.data || [];
                    setTeams(members);
                    if (members.length) setSignatoryId(members[0].id);
                }
            } catch (err) {
                console.error("Failed to load team members", err);
            } finally {
                if (active) setLoadingTeams(false);
            }
        })();
        return () => {
            active = false;
        };
    }, []);

    // ---- Line item helpers ----
    const updateItem = (id: string, patch: Partial<LineItemState>) => {
        setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
    };

    const updateVariant = (itemId: string, variantId: string, patch: Partial<VariantRow>) => {
        setItems((prev) =>
            prev.map((it) =>
                it.id !== itemId ? it : { ...it, variants: it.variants.map((v) => (v.id === variantId ? { ...v, ...patch } : v)) }
            )
        );
    };

    const addLineItem = () => setItems((prev) => [...prev, emptyLineItem()]);

    const removeLineItem = (id: string) => setItems((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev));

    const addVariant = (itemId: string) =>
        setItems((prev) => prev.map((it) => (it.id === itemId ? { ...it, variants: [...it.variants, emptyVariant()] } : it)));

    const removeVariant = (itemId: string, variantId: string) =>
        setItems((prev) =>
            prev.map((it) => {
                if (it.id !== itemId || it.variants.length <= 1) return it;
                return { ...it, variants: it.variants.filter((v) => v.id !== variantId) };
            })
        );

    const handleSearchChange = (itemId: string, value: string) => {
        updateItem(itemId, { query: value, name: value, showResults: true, autoFilled: false });

        if (searchTimers.current[itemId]) clearTimeout(searchTimers.current[itemId]);

        if (!value.trim()) {
            updateItem(itemId, { results: [], searching: false });
            return;
        }

        updateItem(itemId, { searching: true });
        searchTimers.current[itemId] = setTimeout(async () => {
            try {
                const res = await fetch(`/api/products?search=${encodeURIComponent(value.trim())}&limit=6&is_active=true`);
                const json = await res.json();
                const products: ProductLite[] = json?.data?.products || [];
                updateItem(itemId, { results: products, searching: false });
            } catch (err) {
                console.error("Product search failed", err);
                updateItem(itemId, { results: [], searching: false });
            }
        }, 350);
    };

    const selectProduct = (itemId: string, product: ProductLite) => {
        setItems((prev) =>
            prev.map((it) => {
                if (it.id !== itemId) return it;
                const updatedVariants = it.variants.map((v, idx) =>
                    idx === 0 ? { ...v, description: v.description || product.name, unitPrice: v.unitPrice || product.price } : v
                );
                return {
                    ...it,
                    name: product.name,
                    brand: product.brand?.name || "",
                    manufacturer: product.manufacturer || "",
                    origin: product.country_of_origin || "",
                    specNote: product.technical_description || product.product_description || "",
                    autoFilled: true,
                    specsOpen: true,
                    query: product.name,
                    results: [],
                    showResults: false,
                    variants: updatedVariants,
                };
            })
        );
    };

    // ---- Computations ----
    const itemSubtotal = (item: LineItemState) =>
        item.variants.reduce((s, v) => s + (Number(v.qty) || 0) * (Number(v.unitPrice) || 0), 0);

    const itemsSubtotal = useMemo(() => items.reduce((s, it) => s + itemSubtotal(it), 0), [items]);
    const installationTotal = useMemo(() => (Number(installQty) || 0) * (Number(installPrice) || 0), [installQty, installPrice]);
    const subtotal = itemsSubtotal + installationTotal;
    const taxAmount = subtotal * ((Number(tdsVds) || 0) / 100);
    const grandTotal = subtotal + taxAmount;
    const amountInWords = useMemo(() => numberToWordsBDT(grandTotal), [grandTotal]);

    const selectedSignatory = teams.find((t) => t.id === signatoryId) || null;

    // ---- Draft / Generate ----
    const validateForGenerate = (): string | null => {
        if (!recipientCompany.trim()) return "Recipient company / organization name is required";
        if (!subject.trim()) return "Subject line is required";
        const hasPricedItem = items.some((it) => it.variants.some((v) => v.description.trim() && (Number(v.unitPrice) || 0) > 0));
        if (!hasPricedItem) return "Add at least one product item with a description and price";
        if (teams.length && !signatoryId) return "Select a signatory";
        return null;
    };

    const collectPayload = () => ({
        offerDate,
        proposalRef,
        recipientCompany,
        recipientAttention,
        recipientAddress,
        subject,
        deliveryTerms,
        validity,
        warranty,
        introText,
        closingNote,
        items: items.map((it) => ({
            name: it.name,
            brand: it.brand,
            manufacturer: it.manufacturer,
            origin: it.origin,
            specNote: it.specNote,
            variants: it.variants,
        })),
        installation: {
            description: installDesc,
            note: installNote,
            unit: installUnit,
            qty: installQty,
            unitPrice: installPrice,
            total: installationTotal,
        },
        tdsVds,
        subtotal,
        taxAmount,
        grandTotal,
        amountInWords,
        signatory: selectedSignatory,
        savedAt: new Date().toISOString(),
    });

    const handleSaveDraft = () => {
        try {
            localStorage.setItem("priceProposalDraft", JSON.stringify(collectPayload()));
            toast.success("Draft saved on this device");
        } catch {
            toast.error("Could not save draft");
        }
    };

    const buildPrintableHtml = () => {
        const rows: string[] = [];
        let sn = 0;

        items.forEach((it) => {
            it.variants.forEach((v) => {
                if (!v.description.trim() && !(Number(v.unitPrice) > 0)) return;
                sn += 1;
                const label = it.name && it.name !== v.description ? `${it.name} — ${v.description}` : v.description || it.name;
                rows.push(`
                    <tr>
                        <td class="c">${sn}</td>
                        <td>${escapeHtml(label)}</td>
                        <td class="c">${escapeHtml(v.unit)}</td>
                        <td class="c">${Number(v.qty) || 0}</td>
                        <td class="r">${formatBDT(Number(v.unitPrice) || 0)}</td>
                        <td class="r">${formatBDT((Number(v.qty) || 0) * (Number(v.unitPrice) || 0))}</td>
                    </tr>`);
            });
        });

        if (installationTotal > 0 || installDesc.trim()) {
            sn += 1;
            rows.push(`
                <tr>
                    <td class="c">${sn}</td>
                    <td>Installation &amp; Commissioning Charge${installDesc ? `<br/><span class="muted">${escapeHtml(installDesc)}</span>` : ""}</td>
                    <td class="c">${escapeHtml(installUnit)}</td>
                    <td class="c">${Number(installQty) || 0}</td>
                    <td class="r">${formatBDT(Number(installPrice) || 0)}</td>
                    <td class="r">${formatBDT(installationTotal)}</td>
                </tr>`);
        }

        return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(proposalRef)} - Price Proposal</title>
<style>
    * { box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; color: #1e293b; padding: 32px 40px; font-size: 13px; line-height: 1.55; }
    h1 { font-size: 18px; margin: 0 0 4px; color: #0f172a; }
    .brand { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: #028b82; text-transform: uppercase; }
    .meta { display: flex; justify-content: space-between; margin: 18px 0; font-size: 12px; }
    .meta div { line-height: 1.7; }
    .subject { font-weight: 700; margin: 14px 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 12px; }
    th, td { border: 1px solid #cbd5e1; padding: 6px 8px; vertical-align: top; }
    th { background: #f1f5f9; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }
    td.c { text-align: center; }
    td.r { text-align: right; font-variant-numeric: tabular-nums; }
    .muted { color: #64748b; font-size: 11px; }
    .totals { width: 320px; margin-left: auto; margin-top: 10px; font-size: 12px; }
    .totals div { display: flex; justify-content: space-between; padding: 4px 0; }
    .totals .grand { font-weight: 700; font-size: 14px; border-top: 2px solid #0f172a; margin-top: 4px; padding-top: 8px; color: #028b82; }
    .words { margin-top: 14px; padding: 10px 12px; background: #f0faf9; border: 1px solid #a7d8d3; border-radius: 6px; font-weight: 700; }
    .closing { margin-top: 16px; }
    .sign { margin-top: 40px; }
    .sign .name { font-weight: 700; }
    .print-bar { text-align: right; margin-bottom: 16px; }
    .print-bar button { background: #03a297; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; cursor: pointer; }
    @media print { .print-bar { display: none; } }
</style>
</head>
<body>
    <div class="print-bar"><button onclick="window.print()">Print / Save as PDF</button></div>
    <div class="brand">Unison Biz Limited</div>
    <h1>${escapeHtml(subject) || "Price Proposal"}</h1>
    <div class="meta">
        <div>
            <strong>To:</strong><br/>
            ${escapeHtml(recipientCompany)}<br/>
            ${recipientAttention ? `${escapeHtml(recipientAttention)}<br/>` : ""}
            ${recipientAddress ? escapeHtml(recipientAddress).replace(/\n/g, "<br/>") : ""}
        </div>
        <div>
            <strong>Offer Date:</strong> ${escapeHtml(offerDate)}<br/>
            <strong>Reference No.:</strong> ${escapeHtml(proposalRef)}<br/>
            <strong>Delivery Terms:</strong> ${escapeHtml(deliveryTerms)}<br/>
            <strong>Validity:</strong> ${escapeHtml(validity)}<br/>
            <strong>Warranty:</strong> ${escapeHtml(warranty)}
        </div>
    </div>
    <p>${escapeHtml(introText).replace(/\n/g, "<br/>")}</p>
    <table>
        <thead>
            <tr><th style="width:32px">SN</th><th>Description</th><th style="width:70px">Unit</th><th style="width:60px">Qty</th><th style="width:110px">Unit Price (BDT)</th><th style="width:120px">Total (BDT)</th></tr>
        </thead>
        <tbody>
            ${rows.join("") || `<tr><td colspan="6" class="c muted">No items added</td></tr>`}
        </tbody>
    </table>
    <div class="totals">
        <div><span>Subtotal (excl. VAT &amp; Tax)</span><span>${formatBDT(subtotal)}</span></div>
        <div><span>TDS &amp; VDS (${Number(tdsVds) || 0}%)</span><span>${formatBDT(taxAmount)}</span></div>
        <div class="grand"><span>Grand Total</span><span>${formatBDT(grandTotal)}</span></div>
    </div>
    <div class="words">Amount in Words: ${escapeHtml(amountInWords)}</div>
    <p class="closing">${escapeHtml(closingNote).replace(/\n/g, "<br/>")}</p>
    <div class="sign">
        Sincerely,<br/><br/><br/>
        <div class="name">${escapeHtml(selectedSignatory?.name || "")}</div>
        <div class="muted">${escapeHtml(selectedSignatory?.position || "")}, Unison Biz Ltd.</div>
        <div class="muted">${escapeHtml(selectedSignatory?.phone || selectedSignatory?.email || "")}</div>
    </div>
</body>
</html>`;
    };

    const openPrintWindow = () => {
        const html = buildPrintableHtml();
        const win = window.open("", "_blank", "width=880,height=1000");
        if (!win) {
            toast.error("Please allow pop-ups to preview the proposal");
            return;
        }
        win.document.open();
        win.document.write(html);
        win.document.close();
        win.focus();
    };

    const handlePreview = () => {
        const err = validateForGenerate();
        if (err) {
            toast.error(err);
            return;
        }
        openPrintWindow();
    };

    const handleGenerate = () => {
        const err = validateForGenerate();
        if (err) {
            toast.error(err);
            return;
        }
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            toast.success("Proposal generated — opening print preview");
            openPrintWindow();
        }, 400);
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="space-y-6">
                {/* Page Title Banner */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link
                            href="/admin/proposals"
                            className="mb-1 inline-flex items-center gap-2 text-xs font-semibold text-brand hover:underline"
                        >
                            <i className="far fa-arrow-left text-[11px]" />
                            Back to Proposals
                        </Link>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create Price Proposal</h1>
                        <p className="mt-1 text-xs text-slate-500">
                            Generate formal medical equipment &amp; gas pipeline price proposal letters for clients.
                        </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-brand md:self-auto">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        Draft Mode #{proposalRef}
                    </span>
                </div>

                {/* Main Form Card */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="space-y-8 p-6 md:p-8">
                        {/* STEP 1: Reference & Meta */}
                        <section className="grid grid-cols-1 gap-6 border-b border-slate-100 pb-6 md:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Offer Date</label>
                                <div className="relative">
                                    <input
                                        readOnly
                                        value={offerDate}
                                        className="w-full cursor-not-allowed select-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-xs font-semibold text-slate-700"
                                    />
                                    <i className="far fa-calendar pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400" />
                                </div>
                                <p className="mt-1 text-[11px] text-slate-400">Auto-generated system date</p>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Proposal Reference / Offer No. <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        value={proposalRef}
                                        onChange={(e) => setProposalRef(e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 font-mono text-xs font-medium text-slate-900 transition-all focus:border-brand focus:ring-2 focus:ring-brand"
                                    />
                                    <i className="far fa-hashtag pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400" />
                                </div>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    Suggested format: <span className="font-mono text-slate-600">UBL-[Client]-[Date]</span>
                                </p>
                            </div>
                        </section>

                        {/* STEP 2: Recipient Details */}
                        <section className="space-y-4">
                            <SectionHeading icon="fa-user-tie" tone="emerald" title="Recipient Details" />
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-slate-700">
                                        Company / Organization Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        value={recipientCompany}
                                        onChange={(e) => setRecipientCompany(e.target.value)}
                                        placeholder="e.g. Apon Healthcare Ltd"
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-xs text-slate-900 focus:border-brand focus:ring-2 focus:ring-brand"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-slate-700">Attention / Designation</label>
                                    <input
                                        value={recipientAttention}
                                        onChange={(e) => setRecipientAttention(e.target.value)}
                                        placeholder="e.g. Managing Director"
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-xs text-slate-900 focus:border-brand focus:ring-2 focus:ring-brand"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="mb-1 block text-xs font-medium text-slate-700">Delivery &amp; Billing Address</label>
                                    <textarea
                                        rows={2}
                                        value={recipientAddress}
                                        onChange={(e) => setRecipientAddress(e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs leading-relaxed text-slate-900 focus:border-brand focus:ring-2 focus:ring-brand"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* STEP 3: Subject & Terms */}
                        <section className="space-y-4 border-t border-slate-100 pt-4">
                            <SectionHeading icon="fa-file-lines" tone="blue" title="Proposal Terms & Scope" />
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="md:col-span-2">
                                    <label className="mb-1 block text-xs font-medium text-slate-700">
                                        Subject Line <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="e.g. Price Proposal for Supply, Installation & Commissioning of ..."
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-xs font-medium text-slate-900 focus:border-brand focus:ring-2 focus:ring-brand"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-slate-700">Delivery Terms</label>
                                    <select
                                        value={deliveryTerms}
                                        onChange={(e) => setDeliveryTerms(e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs text-slate-900 focus:border-brand focus:ring-2 focus:ring-brand"
                                    >
                                        {DELIVERY_TERMS.map((d) => (
                                            <option key={d.value} value={d.value}>
                                                {d.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-slate-700">Currency</label>
                                    <input
                                        readOnly
                                        value="BDT (Bangladeshi Taka)"
                                        className="w-full select-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-slate-700">Offer Validity Period</label>
                                    <select
                                        value={validity}
                                        onChange={(e) => setValidity(e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                                    >
                                        {VALIDITY_OPTIONS.map((v) => (
                                            <option key={v} value={v}>
                                                {v}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-slate-700">Standard Warranty</label>
                                    <input
                                        value={warranty}
                                        onChange={(e) => setWarranty(e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* STEP 4: Narrative Content */}
                        <section className="space-y-4 border-t border-slate-100 pt-4">
                            <SectionHeading icon="fa-pen-nib" tone="amber" title="Narrative Content & Letter Body" />
                            <div>
                                <div className="mb-1 flex items-center justify-between">
                                    <label className="block text-xs font-medium text-slate-700">Introductory Statement</label>
                                    <span className="text-[11px] text-slate-400">Editable proposal body</span>
                                </div>
                                <textarea
                                    rows={5}
                                    value={introText}
                                    onChange={(e) => setIntroText(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3.5 py-3 text-xs leading-relaxed text-slate-800 focus:border-brand focus:ring-2 focus:ring-brand"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-medium text-slate-700">Closing Commitment & Note</label>
                                <textarea
                                    rows={3}
                                    value={closingNote}
                                    onChange={(e) => setClosingNote(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3.5 py-3 text-xs leading-relaxed text-slate-800 focus:border-brand focus:ring-2 focus:ring-brand"
                                />
                            </div>
                        </section>

                        {/* STEP 5: Product Line Items */}
                        <section className="space-y-6 border-t border-slate-100 pt-4">
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <SectionHeading icon="fa-boxes-stacked" tone="emerald" title="Product Line Items & Specifications" />
                                    <p className="mt-1 text-xs text-slate-500">
                                        Search and select products from the catalog to auto-populate specifications, or add custom rows,
                                        units, quantities, and pricing.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={addLineItem}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
                                >
                                    <i className="far fa-plus text-[11px]" />
                                    Add Product Item
                                </button>
                            </div>

                            <div className="space-y-6">
                                {items.map((item, index) => (
                                    <LineItemCard
                                        key={item.id}
                                        index={index}
                                        item={item}
                                        canRemove={items.length > 1}
                                        onRemove={() => removeLineItem(item.id)}
                                        onSearchChange={(v) => handleSearchChange(item.id, v)}
                                        onSelectProduct={(p) => selectProduct(item.id, p)}
                                        onToggleSpecs={() => updateItem(item.id, { specsOpen: !item.specsOpen })}
                                        onFieldChange={(patch) => updateItem(item.id, patch)}
                                        onAddVariant={() => addVariant(item.id)}
                                        onRemoveVariant={(vId) => removeVariant(item.id, vId)}
                                        onVariantChange={(vId, patch) => updateVariant(item.id, vId, patch)}
                                        subtotal={itemSubtotal(item)}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* STEP 6: Installation Charge */}
                        <section className="overflow-hidden rounded-xl border border-slate-200 border-l-4 border-l-emerald-500 bg-white shadow-xs">
                            <div className="space-y-4 p-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-brand">
                                            <i className="far fa-screwdriver-wrench text-sm" />
                                        </span>
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-900">Installation &amp; Commissioning Charge</h3>
                                            <p className="text-[11px] text-slate-400">
                                                On-site technical deployment, fitting, configuration and validation
                                            </p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-brand">
                                        Scope Item
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 gap-4 pt-1 md:grid-cols-3">
                                    <div className="space-y-3 md:col-span-2">
                                        <div>
                                            <label className="mb-1 block text-xs font-semibold text-slate-700">
                                                Work Scope &amp; Deliverables Description
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={installDesc}
                                                onChange={(e) => setInstallDesc(e.target.value)}
                                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs leading-relaxed text-slate-800 focus:ring-2 focus:ring-brand"
                                            />
                                        </div>
                                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                                            <label className="mb-1 block text-[11px] font-semibold text-slate-600">
                                                Special Site Condition / Customer Note
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={installNote}
                                                onChange={(e) => setInstallNote(e.target.value)}
                                                className="w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs italic text-slate-700 focus:ring-1 focus:ring-brand"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="mb-1 block text-[11px] font-medium text-slate-600">Billing Unit</label>
                                                    <select
                                                        value={installUnit}
                                                        onChange={(e) => setInstallUnit(e.target.value)}
                                                        className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-800"
                                                    >
                                                        <option>Job</option>
                                                        <option>Lumsum</option>
                                                        <option>Floor</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="mb-1 block text-[11px] font-medium text-slate-600">Quantity</label>
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        value={installQty}
                                                        onChange={(e) => setInstallQty(Number(e.target.value))}
                                                        className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-center text-xs font-medium text-slate-800"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-[11px] font-medium text-slate-600">Unit Price (BDT)</label>
                                                <div className="relative">
                                                    <span className="absolute left-2.5 top-1.5 font-mono text-xs text-slate-400">৳</span>
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        value={installPrice}
                                                        onChange={(e) => setInstallPrice(Number(e.target.value))}
                                                        className="w-full rounded-lg border border-slate-300 bg-white py-1.5 pl-6 pr-2 text-right font-mono text-xs font-medium text-slate-800"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                                            <span className="text-xs font-bold text-slate-700">Total Charge:</span>
                                            <div className="text-right">
                                                <span className="font-mono text-sm font-bold text-brand">{formatBDT(installationTotal)}</span>
                                                <span className="block text-[9px] font-medium text-emerald-600">Auto-calculated</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* STEP 7: Financial Summary */}
                        <section className="space-y-4 border-t border-slate-100 pt-4">
                            <div className="flex flex-col items-stretch gap-6 lg:flex-row">
                                <div className="flex flex-1 flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <i className="far fa-circle-info text-emerald-600" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                                Commercial Invoicing Terms
                                            </span>
                                        </div>
                                        <ul className="list-inside list-disc space-y-1.5 text-xs leading-relaxed text-slate-600">
                                            <li>All prices are quoted in Bangladeshi Taka (BDT) on {deliveryTerms} basis.</li>
                                            <li>Applicable Tax and VAT are calculated strictly according to National Board of Revenue (NBR) regulatory rates.</li>
                                            <li>Payment terms: 50% advance along with confirmed work order, 40% against material shipment, 10% post commissioning handover.</li>
                                        </ul>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 border-t border-slate-200 pt-3 text-[11px] text-slate-500">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                        System verified: {items.length} line item{items.length === 1 ? "" : "s"} &amp; installation scope are synchronized.
                                    </div>
                                </div>
                                <div className="w-full space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:w-96">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
                                        <div>
                                            <span className="font-medium text-slate-600">Total Price excluding Vat &amp; Tax:</span>
                                            <span className="block text-[10px] text-slate-400">Auto-summed subtotal</span>
                                        </div>
                                        <span className="font-mono text-sm font-bold text-slate-800">{formatBDT(subtotal)}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-1 text-xs">
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-medium text-slate-600">TDS &amp; VDS:</span>
                                            <div className="flex items-center rounded border border-slate-300 bg-slate-50 px-1.5 py-0.5">
                                                <input
                                                    type="number"
                                                    min={0}
                                                    max={100}
                                                    value={tdsVds}
                                                    onChange={(e) => setTdsVds(Number(e.target.value))}
                                                    className="w-8 border-0 bg-transparent p-0 text-center text-[11px] font-bold text-slate-800 focus:ring-0"
                                                />
                                                <span className="text-[10px] font-semibold text-slate-500">%</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-mono text-xs font-medium text-slate-700">{formatBDT(taxAmount)}</span>
                                            <span className="block text-[9px] text-slate-400">Auto-calculated: {tdsVds}% of Subtotal</span>
                                        </div>
                                    </div>
                                    <div className="my-1 h-px bg-slate-200" />
                                    <div className="flex items-center justify-between pt-1">
                                        <div>
                                            <span className="block text-xs font-bold uppercase tracking-wider text-slate-900">
                                                Total Price including Vat &amp; Tax:
                                            </span>
                                            <span className="text-[10px] font-semibold text-emerald-600">Grand Total Payable</span>
                                        </div>
                                        <span className="font-mono text-xl font-extrabold tracking-tight text-emerald-600">{formatBDT(grandTotal)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-white text-brand shadow-2xs">
                                        <i className="far fa-quote-left" />
                                    </span>
                                    <div>
                                        <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-700">Amount in Words</span>
                                        <p className="text-xs font-bold tracking-tight text-slate-800 sm:text-sm">[Total: {amountInWords}]</p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center self-start rounded-full border border-emerald-300 bg-white px-2.5 py-1 text-[10px] font-bold text-emerald-800 shadow-2xs sm:self-auto">
                                    Auto-generated in words (BDT)
                                </span>
                            </div>
                        </section>

                        {/* STEP 8: Signatory Authority */}
                        <section className="space-y-4 border-t border-slate-100 pt-4">
                            <SectionHeading icon="fa-user-check" tone="purple" title="Signatory Authority" />
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-slate-700">
                                        Select Signing Team Member <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={signatoryId ?? ""}
                                        onChange={(e) => setSignatoryId(e.target.value ? Number(e.target.value) : null)}
                                        disabled={loadingTeams || teams.length === 0}
                                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs text-slate-900 focus:border-brand focus:ring-2 focus:ring-brand disabled:bg-slate-50 disabled:text-slate-400"
                                    >
                                        {loadingTeams && <option>Loading team members…</option>}
                                        {!loadingTeams && teams.length === 0 && <option>No team members found</option>}
                                        {teams.map((t) => (
                                            <option key={t.id} value={t.id}>
                                                {t.name} - {t.position}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="mt-1 text-[11px] text-slate-400">
                                        {teams.length === 0 && !loadingTeams ? (
                                            <>
                                                Add a team member under{" "}
                                                <Link href="/admin/teams" className="font-medium text-brand hover:underline">
                                                    People &gt; Teams
                                                </Link>{" "}
                                                to enable signatory selection.
                                            </>
                                        ) : (
                                            "Determines the signature footer & official contact information."
                                        )}
                                    </p>
                                </div>
                                <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 text-sm font-bold text-brand">
                                        {selectedSignatory ? initialsOf(selectedSignatory.name) : "--"}
                                    </span>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-xs font-bold text-slate-900">{selectedSignatory?.name || "No signatory selected"}</h4>
                                            {selectedSignatory && (
                                                <span className="inline-flex items-center rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800">
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-600">
                                            {selectedSignatory ? `${selectedSignatory.position}, Unison Biz Ltd.` : "Pick a team member to preview signature details."}
                                        </p>
                                        {selectedSignatory && (selectedSignatory.phone || selectedSignatory.email) && (
                                            <div className="flex items-center gap-1.5 pt-0.5 text-[11px] text-slate-500">
                                                <i className="far fa-phone text-[10px] text-slate-400" />
                                                <span className="font-mono font-medium text-slate-700">
                                                    {selectedSignatory.phone || selectedSignatory.email}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer Action Bar */}
                    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur sm:flex-row md:px-8">
                        <div className="flex w-full items-center gap-2 text-xs text-slate-500 sm:w-auto">
                            <i className="far fa-circle-info text-slate-400" />
                            <span>Draft is stored on this device only until you generate the proposal.</span>
                        </div>
                        <div className="flex w-full items-center gap-3 sm:w-auto">
                            <button
                                type="button"
                                onClick={handleSaveDraft}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 shadow-2xs transition-colors hover:bg-slate-100 hover:text-slate-900 sm:w-auto"
                            >
                                Save Draft
                            </button>
                            <button
                                type="button"
                                onClick={handlePreview}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-semibold text-brand shadow-2xs transition-colors hover:bg-emerald-100 sm:flex-initial"
                            >
                                <i className="far fa-eye text-[11px]" />
                                Preview PDF
                            </button>
                            <button
                                type="button"
                                disabled={isGenerating}
                                onClick={handleGenerate}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60 sm:flex-initial"
                            >
                                {isGenerating ? (
                                    <>
                                        <i className="far fa-spinner-third animate-spin text-[11px]" />
                                        Generating…
                                    </>
                                ) : (
                                    <>
                                        <i className="far fa-paper-plane text-[11px]" />
                                        Generate Proposal
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function SectionHeading({ icon, title, tone }: { icon: string; title: string; tone: "emerald" | "blue" | "amber" | "purple" }) {
    const toneClasses: Record<string, string> = {
        emerald: "bg-emerald-50 text-brand",
        blue: "bg-blue-50 text-blue-600",
        amber: "bg-amber-50 text-amber-600",
        purple: "bg-purple-50 text-purple-600",
    };
    return (
        <div className="flex items-center gap-2">
            <span className={`flex h-6 w-6 items-center justify-center rounded-md ${toneClasses[tone]}`}>
                <i className={`far ${icon} text-[11px]`} />
            </span>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">{title}</h2>
        </div>
    );
}

function LineItemCard({
    index,
    item,
    canRemove,
    onRemove,
    onSearchChange,
    onSelectProduct,
    onToggleSpecs,
    onFieldChange,
    onAddVariant,
    onRemoveVariant,
    onVariantChange,
    subtotal,
}: {
    index: number;
    item: LineItemState;
    canRemove: boolean;
    onRemove: () => void;
    onSearchChange: (value: string) => void;
    onSelectProduct: (p: ProductLite) => void;
    onToggleSpecs: () => void;
    onFieldChange: (patch: Partial<LineItemState>) => void;
    onAddVariant: () => void;
    onRemoveVariant: (variantId: string) => void;
    onVariantChange: (variantId: string, patch: Partial<VariantRow>) => void;
    subtotal: number;
}) {
    const hasSpecInfo = item.brand || item.manufacturer || item.origin || item.specNote;

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition-all hover:border-slate-300">
            {/* Header bar */}
            <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50/80 p-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="relative max-w-xl flex-1">
                        <i className="far fa-magnifying-glass pointer-events-none absolute left-3 top-2.5 text-emerald-600" />
                        <input
                            value={item.query}
                            onChange={(e) => onSearchChange(e.target.value)}
                            onFocus={() => onFieldChange({ showResults: true })}
                            onBlur={() => setTimeout(() => onFieldChange({ showResults: false }), 150)}
                            placeholder="Search catalog or type a custom item name…"
                            className="w-full rounded-lg border border-slate-300 bg-white py-1.5 pl-9 pr-3 text-xs font-semibold text-slate-800 shadow-2xs focus:border-brand focus:ring-2 focus:ring-brand"
                        />
                        {item.showResults && (item.searching || item.results.length > 0) && (
                            <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                                {item.searching && <div className="px-3 py-2 text-xs text-slate-400">Searching…</div>}
                                {!item.searching &&
                                    item.results.map((p) => (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onMouseDown={() => onSelectProduct(p)}
                                            className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-xs hover:bg-slate-50"
                                        >
                                            <span className="font-semibold text-slate-800">{p.name}</span>
                                            <span className="text-[11px] text-slate-400">
                                                {p.brand?.name || p.manufacturer} · {formatBDT(p.price)}
                                            </span>
                                        </button>
                                    ))}
                            </div>
                        )}
                    </div>
                    {item.autoFilled && (
                        <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-800">
                            <i className="far fa-check text-[9px] text-emerald-600" />
                            Auto-filled from catalog
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 self-end md:self-auto">
                    <button type="button" onClick={onToggleSpecs} className="p-1 text-xs font-medium text-slate-500 transition-colors hover:text-slate-800">
                        {item.specsOpen ? "Hide Specs" : "Edit Specs"}
                    </button>
                    {canRemove && (
                        <>
                            <span className="text-slate-300">|</span>
                            <button type="button" title="Remove Item" onClick={onRemove} className="p-1 text-rose-500 transition-colors hover:text-rose-700">
                                <i className="far fa-trash text-xs" />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Spec card */}
            {item.specsOpen && (
                <div className="border-b border-slate-100 bg-slate-50/40 p-4">
                    <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-3 text-xs">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <LabeledMiniInput
                                label="Brand"
                                value={item.brand}
                                onChange={(v) => onFieldChange({ brand: v })}
                            />
                            <LabeledMiniInput
                                label="Manufacturer"
                                value={item.manufacturer}
                                onChange={(v) => onFieldChange({ manufacturer: v })}
                            />
                            <LabeledMiniInput
                                label="Origin"
                                value={item.origin}
                                onChange={(v) => onFieldChange({ origin: v })}
                            />
                        </div>
                        <div className="pt-1">
                            <span className="mb-0.5 block font-semibold text-slate-800">Specification &amp; Compliance Notes</span>
                            <textarea
                                rows={2}
                                value={item.specNote}
                                onChange={(e) => onFieldChange({ specNote: e.target.value })}
                                placeholder="Technical parameters, certification, function details…"
                                className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-[11px] leading-relaxed text-slate-600 focus:ring-1 focus:ring-brand"
                            />
                        </div>
                        {!hasSpecInfo && <p className="text-[11px] text-slate-400">Select a catalog item above to auto-fill specs, or fill them in manually.</p>}
                    </div>
                </div>
            )}

            {/* Variant pricing table */}
            <div className="overflow-x-auto p-4">
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            <th className="pb-2 font-semibold">Variant / Item Description</th>
                            <th className="w-28 pb-2 font-semibold">Unit</th>
                            <th className="w-24 pb-2 font-semibold">Qty</th>
                            <th className="w-36 pb-2 text-right font-semibold">Unit Price (BDT)</th>
                            <th className="w-36 pb-2 text-right font-semibold">Total Price (BDT)</th>
                            <th className="w-12 pb-2 text-center font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {item.variants.map((v) => (
                            <tr key={v.id}>
                                <td className="py-2.5 pr-3">
                                    <input
                                        value={v.description}
                                        onChange={(e) => onVariantChange(v.id, { description: e.target.value })}
                                        placeholder="Row description"
                                        className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-brand"
                                    />
                                </td>
                                <td className="py-2.5 pr-3">
                                    <select
                                        value={v.unit}
                                        onChange={(e) => onVariantChange(v.id, { unit: e.target.value })}
                                        className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-brand"
                                    >
                                        {UNIT_OPTIONS.map((u) => (
                                            <option key={u} value={u}>
                                                {u}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-2.5 pr-3">
                                    <input
                                        type="number"
                                        min={0}
                                        value={v.qty}
                                        onChange={(e) => onVariantChange(v.id, { qty: Number(e.target.value) })}
                                        className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-center text-xs font-medium text-slate-800 focus:ring-1 focus:ring-brand"
                                    />
                                </td>
                                <td className="py-2.5 pr-3">
                                    <div className="relative">
                                        <span className="absolute left-2.5 top-1.5 font-mono text-slate-400">৳</span>
                                        <input
                                            type="number"
                                            min={0}
                                            value={v.unitPrice}
                                            onChange={(e) => onVariantChange(v.id, { unitPrice: Number(e.target.value) })}
                                            className="w-full rounded-md border border-slate-200 py-1.5 pl-6 pr-2 text-right font-mono text-xs text-slate-800 focus:ring-1 focus:ring-brand"
                                        />
                                    </div>
                                </td>
                                <td className="py-2.5 pr-3 text-right">
                                    <span className="font-mono text-sm font-bold text-brand">{formatBDT((Number(v.qty) || 0) * (Number(v.unitPrice) || 0))}</span>
                                    <span className="block text-[9px] font-medium text-emerald-600">Auto-calculated</span>
                                </td>
                                <td className="py-2.5 text-center">
                                    <button
                                        type="button"
                                        title="Delete Row"
                                        disabled={item.variants.length <= 1}
                                        onClick={() => onRemoveVariant(v.id)}
                                        className="p-1 text-slate-400 transition-colors hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        <i className="far fa-xmark text-xs" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                    <button type="button" onClick={onAddVariant} className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-dark">
                        <i className="far fa-plus text-[11px]" />
                        Add Variant Size
                    </button>
                    <div className="text-xs font-medium text-slate-500">
                        Item #{String(index + 1).padStart(2, "0")} Subtotal: <span className="font-mono font-bold text-slate-900">{formatBDT(subtotal)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LabeledMiniInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div>
            <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</span>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-700 focus:ring-1 focus:ring-brand"
            />
        </div>
    );
}
