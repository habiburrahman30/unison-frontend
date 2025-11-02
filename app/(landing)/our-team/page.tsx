export default function OurTeamPage() {

    const teamData = [
        {
            name: "Md. Kamrul Alam",
            role: "Chairman",
            image: "",
            socials: {
                facebook: "https://www.facebook.com/",
                twitter: "",
                linkedin: "https://www.linkedin.com/",
                youtube: ""
            }
        },
        {
            name: "Md. Sopun Fakir",
            role: "Managing Director",
            image: "",
            socials: {
                facebook: "https://www.facebook.com/",
                twitter: "",
                linkedin: "https://www.linkedin.com/",
                youtube: ""
            }
        },
        {
            name: "Md. Saiful Hasan",
            role: "General Manager",
            image: "",
            socials: {
                facebook: "https://www.facebook.com/",
                twitter: "",
                linkedin: "https://www.linkedin.com/",
                youtube: ""
            }
        },
        {
            name: "Md. Fakrul Abadin",
            role: "Head of Sales",
            image: "",
            socials: {
                facebook: "https://www.facebook.com/",
                twitter: "",
                linkedin: "https://www.linkedin.com/",
                youtube: ""
            }
        }
    ];
    return <>
        <main className="main">
            {/* breadcrumb */}
            <div className="site-breadcrumb">
                <div
                    className="site-breadcrumb-bg"
                    style={{ background: "url(/assets/img/breadcrumb/01.jpg)" }}
                />
                <div className="container">
                    <div className="site-breadcrumb-wrap">
                        <h4 className="breadcrumb-title">Our Team</h4>
                        <ul className="breadcrumb-menu">
                            <li>
                                <a href={"/"}>
                                    <i className="far fa-home" /> Home
                                </a>
                            </li>
                            <li className="active">Our Team</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* breadcrumb end */}
            {/* team-area */}
            <div className="team-area pt-100 pb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">Our Team</span>
                                <h2 className="site-title">
                                    Meet Our Expert <span>Team</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        {teamData.map((team, index) => (
                            <div className="col-md-6 col-lg-3" key={index}>
                                <div className="team-item wow fadeInUp" data-wow-delay={`${(index + 1) * 0.25}s`}>
                                    <div className="team-img">
                                        <img src={team.image && team.image !== "" ? team.image : "/assets/img/no-image-found.jpg"}
                                            alt={team.name} />
                                    </div>
                                    <div className="team-content">
                                        <div className="team-bio">
                                            <h5><a href="#">{team.name}</a></h5>
                                            <span>{team.role}</span>
                                        </div>
                                    </div>
                                    <div className="team-social">
                                        {team.socials.facebook && (
                                            <a href={team.socials.facebook}><i className="fab fa-facebook-f" /></a>
                                        )}
                                        {team.socials.twitter && (
                                            <a href={team.socials.twitter}><i className="fab fa-x-twitter" /></a>
                                        )}
                                        {team.socials.linkedin && (
                                            <a href={team.socials.linkedin}><i className="fab fa-linkedin-in" /></a>
                                        )}
                                        {team.socials.youtube && (
                                            <a href={team.socials.youtube}><i className="fab fa-youtube" /></a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>
            {/* team-area end */}
        </main>

    </>;
}