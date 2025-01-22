import React from "react";

const CompletionPage = () => {
  return (
    <div className="w-full px-20 py-20 bg-cecOrange h-screen">
      <div className="z-10 w-full md:w-4/5 bg-white rounded-md h-full px-10 py-10 mx-auto flex flex-col items-center justify-center gap-2">
        <h2 className="text-3xl whitespace-wrap">Submission Completed!!</h2>
        <h2 className="text-2xl text-cecOrange">
          You may proceed to the Security Reception
        </h2>
      </div>
    </div>
  );
};

export default CompletionPage;
