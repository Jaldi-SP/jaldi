import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  UserGroupIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../public/img/whatsapp.png";
import benefitTwoImg from "../../public/img/benefit-two.png";

const benefitOne = {
  title: "Give your employees superpowers",
  desc: "Ezwait can track all your appointments, manage your walk-ins with a waitlist, and allow you to reach out to your customers",
  image: benefitOneImg,
  bullets: [
    {
      title: "Set operations on autopilot",
      desc: "Automate appointment confirmations, reminders, thank you messages, and get more feedback from your customers.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Get answers driven by data",
      desc: "Ezwait answers your burning questions to make your business the best in class - know when your business is the busiest, what resources are being used, and where you can improve.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Treat customers like family",
      desc: "We build you a customer directory so you can make profiles for each customer, notify them on whatsapp, and run personalised marketing campaigns so they keep coming back for more. ",
      icon: <UserGroupIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "Nextly is designed as a mobile first responsive template.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "This template is powered by latest technologies and tools.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Nextly comes with a zero-config light & dark mode. ",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
