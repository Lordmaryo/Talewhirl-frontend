import React from "react";
import countries from "../data/countries.json";

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

const CountrySelector = ({
  selectedCountry,
  onCountryChange,
}: CountrySelectorProps) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCountryChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-2 mt-4">
      <label htmlFor="country-select" className="text-left text-sm text-[#0000008d]">Country / Region of residence: </label>
      <select
        id="country-select"
        value={selectedCountry}
        onChange={handleSelectChange}
         className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="">Choose a country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
