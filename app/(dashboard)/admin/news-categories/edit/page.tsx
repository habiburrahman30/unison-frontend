"use client";

import Link from "next/link";


export default function EditCategoryPage() {
    return (

        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Edit Category</h4>
                    <div className="user-form">
                        <form action="#">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue="Antoni"
                                            placeholder="First Name"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue="Jonson"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue="antoni@example.com"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue="+2 134 562 458"
                                            placeholder="Phone"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue="New York, USA"
                                            placeholder="Address"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-start">

                                    <Link href="/admin/news-categories" className="theme-btn">
                                        <span className="far fa-arrow-left" /> Back
                                    </Link>
                                </div>

                                <div className="col text-end">
                                    <button type="submit" className="theme-btn">
                                        <span className="far fa-user" /> Save Changes
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
}
