import React from "react";
import ColorPalettes from "../components/ColorPalettes";

/**
 *
 * @returns An About page telling what I've been up to these past 20 years
 */
const AboutPage = () => {
	return (
		<div name="about" className="w-full h-screen bg-background text-text">
			<div className="flex flex-col justify-center items-start w-full h-full">
				<div className="pl-5 md:pl-20 md:pr-20 w-full">
					<div className="text-left pb-8">
						<p className="text-2xl md:text-4xl font-bold inline border-b-4 border-primary">
							about ...
						</p>
					</div>
				</div>

				<div className="pl-5 pr-5 md:pl-20 md:pr-20 w-full">
					<div>
						<p className="leading-7">
							A series of React components for interacting with Bundlr. Just something I built
							to teach me their web interface. Totally opensource, do with it as you wish.
							It's been a crazy monsoon season this year in Bangkok, so I gave it a verdant
							color theme.
						</p>
						<p className="ml-10 pr-10 md:ml-10 md:mt-5 md:pl-20 md:pr-20 leading-7">
							<ol className="list-decimal list-outside">
								<li className="text-4xl">
									<span className="text-base">
										<a href="" target="_blank" className="underline">
											Read a blog
										</a>{" "}
										post detailing these components.
									</span>
								</li>
								<li className="text-4xl">
									<span className="text-base">
										<a
											href="https://github.com/lukecd/bundlr-tools"
											target="_blank"
											className="underline"
										>
											Check out the sourecode
										</a>{" "}
										(it's opensource, MIT license).
									</span>
								</li>
								<li className="text-4xl">
									<span className="text-base">
										<a
											href="https://luke.gallery"
											target="_blank"
											className="underline"
										>
											See
										</a>
										&nbsp;more of my work.
									</span>
								</li>
								<li className="text-4xl">
									<span className="text-base">Customize colors in tailwind.config</span>
								</li>
								<li className="text-4xl">
									<span className="text-base">
										ps: These are UNOFFICIAL components. !supported by Bundlr or
										anything like that.
									</span>
								</li>
							</ol>
						</p>
					</div>
				</div>
				<div className="pl-5 pr-5 pt-20 md:pl-20 md:pr-20 w-full">
					<ColorPalettes />
				</div>
			</div>
		</div>
	);
};
export default AboutPage;

///
