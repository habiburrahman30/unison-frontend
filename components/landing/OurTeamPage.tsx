"use client";

interface SocialLinks {
    facebook?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    instagram?: string | null;
}

interface TeamMember {
    id: number;
    name: string;
    position: string;
    bio: string | null;
    image: string | null;
    email: string | null;
    phone: string | null;
    social_links: any;
}

interface Props {
    teamData: TeamMember[];
}

export default function OurTeamPage({ teamData }: Props) {
    return (
        <main className="main">
            {/* Breadcrumb */}
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
                                <a href="/">
                                    <i className="far fa-home" /> Home
                                </a>
                            </li>
                            <li className="active">Our Team</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Team Area */}
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

                    {teamData.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="text-muted">No team members found.</p>
                        </div>
                    ) : (
                        <div className="row mt-5">
                            {teamData.map((member, index) => {
                                const socials = (member.social_links as SocialLinks) || {};
                                return (
                                    <div className="col-md-6 col-lg-3" key={member.id}>
                                        <div
                                            className="team-item wow fadeInUp"
                                            data-wow-delay={`${(index + 1) * 0.25}s`}
                                        >
                                            <div className="team-img">
                                                <img
                                                    src={member.image || "/assets/img/no-image-found.jpg"}
                                                    alt={member.name}
                                                />
                                            </div>
                                            {/* <div className="team-content">
                                                <div className="team-bio">
                                                    <h5><a href="#">{member.name}</a></h5>
                                                    <span>{member.position}</span>
                                                </div>
                                            </div>
                                            <div className="team-social">
                                                {socials.facebook && (
                                                    <a href={socials.facebook} target="_blank" rel="noopener noreferrer">
                                                        <i className="fab fa-facebook-f" />
                                                    </a>
                                                )}
                                                {socials.twitter && (
                                                    <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
                                                        <i className="fab fa-x-twitter" />
                                                    </a>
                                                )}
                                                {socials.linkedin && (
                                                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
                                                        <i className="fab fa-linkedin-in" />
                                                    </a>
                                                )}
                                                {socials.instagram && (
                                                    <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
                                                        <i className="fab fa-instagram" />
                                                    </a>
                                                )} 
                                            </div> */}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}