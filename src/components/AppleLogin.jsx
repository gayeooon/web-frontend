import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const AppleLogin = () => {
  useEffect(() => {
    window.AppleID.auth.init({
      clientId: "[CLIENT_ID]",
      scope: "[SCOPES]",
      redirectURI: "[REDIRECT_URI]",
      state: "[STATE]",
      nonce: "[NONCE]",
      usePopup: true,
    });
  }, []);

  const handleClick = () => {
    window.AppleID.auth.signIn();
  };

  return (
    <>
      <Button variant="apple" onClick={handleClick}>
        <div
          className="h-12"
          id="appleid-signin"
          data-color="black"
          data-border="true"
          data-type="sign in"
        ></div>
      </Button>
    </>
  );
};

export default AppleLogin;
