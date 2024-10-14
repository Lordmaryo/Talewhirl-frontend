import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import baseApi from "../api/baseApi";
import { getToken, setToken } from "../token/Token";
import axios from "axios";
import LoginPage from "./LoginPage";
import countries from "../data/countries.json";
import CountrySelector from "../utilities/CountrySelector";

/**
 * TASKS FOR TODAY!!
 *
 * TODO - style the signUp page with an image on the left and the form on the right
 * TODO - handle and display errors in the signUp page
 */

const SignUpPage = () => {
  const [firstname, setfirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [preferedGenre, setPreferredGenre] = useState<string[]>([]);
  const [errormessage, setErrorMessage] = useState<string[]>([]);
  const [closePopUp, setClosePopUp] = useState<boolean>(false);
  const [loginPage, setLoginPage] = useState<boolean>(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage([]);
    try {
      const response = await baseApi.post("auth/register", {
        firstname,
        lastname,
        email,
        password,
        selectedCountry,
        preferedGenre,
        dob,
      });
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.businessErrorDescription);
      } else {
        setErrorMessage([]);
      }
    }
  };

  console.log(selectedCountry);
  
  if (closePopUp) return null;
  if (loginPage) return <LoginPage />;
  return (
    <div className="flex flex-row bg-white rounded-md sm:max-w-[400px] w-[80%] md:max-w-[620px] h-[420px] text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <CountrySelector
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
      />
      <div>
          <label>Preferred Genre:</label>
          <select
            multiple
            value={preferedGenre}
            onChange={(e) =>
              setPreferredGenre(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="fantasy">Fantasy</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
          </select>
        </div>
    </div>
  );
};

export default SignUpPage;
