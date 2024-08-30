import React from "react";
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {LoginPage} from "../components/Login";
import SignupPage from "../components/Signup";

export function RegisterPage() {
  const data = [
    {
      label: "Login",
      value: "Login",
      icon: UserCircleIcon,
      desc:  <LoginPage/>
    },
    {
      label: "SignUp",
      value: "SignUp",
      icon: UserCircleIcon,
      desc:<SignupPage onSuccess={() => setActiveTab("Login")}/>
    },
  ];

  return (
    <Tabs  className="my-14"value="Login">
      <TabsHeader className="w-96 mx-auto flex justify-center">
        {data.map(({ label, value, icon }) => (
          <Tab
            key={value}
            value={value}
            className="w-40"
          >
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}