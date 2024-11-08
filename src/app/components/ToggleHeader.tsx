import Link from "next/link";
import React, { useEffect, useState } from "react";
import checkAuthAndSetToken, {
  getToken,
  removeToken,
  TokenDataProps,
} from "../token/Token";

const ToggleHeader = () => {
  const [tokenData, setTokenData] = useState<TokenDataProps | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [close, Setclose] = useState(false);

  useEffect(() => {
    checkAuthAndSetToken(getToken, setIsAuthenticated, setTokenData);
  }, []);

  if (close) return null;
  return (
    <>
      {isAuthenticated && ( // condition not requiredjust to satisfy eslint
        <div className="flex flex-col gap-y-2 py-4 px-6">
          <Link
            onClick={() => Setclose(!close)}
            className="px-2 py-1 rounded-lg hover:bg-[#ffffff0c] transition-colors"
            href={`/profile/${tokenData?.id}`}
          >
            View profile
          </Link>
          <button
            className="transition-colors bg-red-700 text-white font-bold px-2 py-1 rounded-md hover:bg-red-600"
            onClick={removeToken}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default ToggleHeader;
