export default function EmptyProductsCard() {
    return (
        <div className="user-card">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="error-wrapper pt-5 pb-5">
                        <div
                            className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light"
                            style={{ width: "100px", height: "100px" }}
                        >
                            <i className="far fa-shopping-basket fa-3x text-muted"></i>
                        </div>
                        <h2>Opos... Product Not Found!</h2>
                        <p>
                            This category doesn't have any products at the moment.
                            Be the first to know when new items arrive!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}