import Image from "next/image";
import { Container } from "@/NextlyComponents/Container";
import heroImg from "../../public/img/phone-shot.png";

export const Hero = () => {
    return (
        <>
            <Container className="flex flex-wrap ">
                <div className="flex items-center w-full lg:w-1/2">
                    <div className="max-w-2xl mb-8">
                        <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
                            Win customers.
                        </h1>
                        <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
                            Reduce costs.
                        </h1>
                        <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
                            Optimize operations.
                        </h1>
                        <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
                            Ezwait is an appointment booking, queue management, and customer outreach platform designed for you. 
                        </p>

                        <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                            <a
                                href="https://web3templates.com/templates/nextly-landing-page-template-for-startups"
                                target="_blank"
                                rel="noopener"
                                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md "
                            >
                                Sign up for free
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full lg:w-1/2">
                    <div className="">
                        <Image
                            src={heroImg}
                            width="300"
                            className={"object-cover"}
                            alt="Hero Illustration"
                            loading="eager"
                            placeholder="blur"
                        />
                    </div>
                </div>
            </Container>
        </>
    );
};
