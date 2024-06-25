import { Container } from "@/NextlyComponents/Container";
import { Hero } from "@/NextlyComponents/Hero";
import { SectionTitle } from "@/NextlyComponents/SectionTitle";
import { Benefits } from "@/NextlyComponents/Benefits";
import { Video } from "@/NextlyComponents/Video";
import { Industries } from "@/NextlyComponents/Industries";
// import { Testimonials } from "@/NextlyComponents/Testimonials";
// import { Faq } from "@/NextlyComponents/Faq";
// import { Cta } from "@/NextlyComponents/Cta";

import { benefitOne, benefitTwo } from "@/NextlyComponents/data";
export default function Home() {
    return (
        <Container>
            <Hero />
            <SectionTitle title="Ezwait takes care of your customers so they take care of you">
                Automate your appointments, waitlists, and market to customers
                all in one platform so your team can do more.
            </SectionTitle>

            <Benefits data={benefitOne} />
            <Benefits imgPos="right" data={benefitTwo} />

            <SectionTitle
                preTitle="Watch our demo"
                title="Ezwait is simple to use"
            >
                Track all stages of your customer journey, notify on whatsapp,
                and view your customer directory.
            </SectionTitle>

            <Video videoId="Qj7wsKl6avI" />

            <SectionTitle
                preTitle="Use cases"
                title="Treat your customers in every industry"
            ></SectionTitle>

            <Industries />

            {/* <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
        Answer your customers possible questions here, it will increase the
        conversion rate as well as support or chat requests.
      </SectionTitle>

      <Faq />  */}
        </Container>
    );
}
