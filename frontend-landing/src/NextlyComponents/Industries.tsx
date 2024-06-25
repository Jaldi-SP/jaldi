import React from "react";
import { Container } from "@/NextlyComponents/Container";
import { FaClinicMedical, FaUniversity, FaRegCalendarAlt, FaShoppingCart, FaDollarSign, FaTableTennis } from "react-icons/fa";

const industries = [
  { name: "Healthcare", icon: FaClinicMedical },
  { name: "Sports", icon: FaTableTennis },
  { name: "Events", icon: FaRegCalendarAlt },
  { name: "Financial Services", icon: FaDollarSign },
  { name: "Retail", icon: FaShoppingCart },
  { name: "Education", icon: FaUniversity }
];

export function Industries() {
  return (
    <Container>
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((industry) => (
            <div key={industry.name} className="text-center">
              <industry.icon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-200" />
              <p className="mt-2 text-base font-medium text-gray-900 dark:text-white">{industry.name} &gt;</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium dark:text-indigo-400">
            See all industries &gt;
          </a>
        </div>
    </Container>
  );
}
