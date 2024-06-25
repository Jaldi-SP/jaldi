import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  UserGroupIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
  StarIcon,
  ChatBubbleBottomCenterIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../public/img/whatsapp.png";
import benefitTwoImg from "../../public/img/benefit-two.png";

const benefitOne = {
  title: "Give your employees superpowers",
  desc: "Ezwait can track all your appointments, manage your walk-ins with a waitlist, and allow you to reach out to your customers",
  image: benefitOneImg,
  bullets: [
    {
      title: "Reduce costs by setting operations on autopilot",
      desc: "Ezwait prevents no-shows by automating appointment confirmations, reminders, and thank you notes.",
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
    {
      title: "Get more feedback",
      desc: "Ezwait encourages customers to give feedback, helping you attract more customers and improve your service.",
      icon: <StarIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Give your customers the gift of time",
  desc: "Happy customers mean better business. With Ezwait, your customers dont have to spend time calling, texting and confirming for an appointment.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Convenient Mobile Booking",
      desc: "Customers can easily book appointments on their phones, ensuring you never lose a customer to a busy line or missed message.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Online Waitlist",
      desc: "Customers join a virtual waitlist and receive real-time updates, reducing the need for large waiting areas and lowering business costs.",
      icon: <ClipboardDocumentListIcon />,
    },
    {
      title: "Maximize Customer Engagement",
      desc: "Ezwait fills empty slots with waitlisted customers, ensuring continuous bookings even during busy times.",
      icon: <CalendarDaysIcon/>,
    },
    {
      title: "Streamlined Communication",
      desc: "Ezwait keeps your customers informed with automated reminders and notifications, enhancing their overall experience.",
      icon: <ChatBubbleBottomCenterIcon />,
    }
  ],
};


export {benefitOne, benefitTwo};
