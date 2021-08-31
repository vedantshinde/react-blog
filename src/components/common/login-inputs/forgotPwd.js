import React from "react";

export default function ForgotPwd({setActiveKey}) {
  return (<>
    <p className="text-primary forgot-pwd" onClick={() => setActiveKey("3")}>
      Forgot your password?
    </p>
  </>);
}
