import React from "react";

/**
 *
 * @returns An About page telling what I've been up to these past 20 years
 */
const AboutPage = () => {
	return (
		<div name="about" className="w-full h-full md:h-screen overflow-visible bg-background text-text">
			<div className="flex flex-col justify-center items-start w-full h-full">
				<div className="pl-20 pr-20w-full grid grid-cols-2 gap-8">
					<div className="text-left pb-8 pl-4">
						<p className="text-4xl font-bold inline border-b-4 border-primary">about ...</p>
					</div>
				</div>

				<div className="px-5 w-full">
					<div>
						<p className="pl-20 pr-20 leading-7">
							A series of React components for interacting with Bundlr. Just something I built
							to teach me their web interface. Totally opensource, do with it as you wish.
							It's been a crazy monsoon season this year in Bangkok, so I gave it a verdant
							color theme.
						</p>
						<p className="ml-10 mt-5 pl-20 pr-20 leading-7">
							<ol className="list-decimal list-outside">
								<li>
									<a href="https://adams.exchange" target="_blank" className="underline">
										Read a blog post detailing these components.
									</a>
								</li>
								<li>
									<a href="https://luke.gallery" target="_blank" className="underline">
										See more of my work.
									</a>
								</li>
								<li>
									ps: These are UNOFFICIAL components. !supported by Bundlr or anything
									like that.
								</li>
							</ol>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AboutPage;

///
