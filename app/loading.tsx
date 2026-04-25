import { LoaderCircle } from "lucide-react";

import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80">
      <div className="w-full h-dvh grid place-content-center">
        <LoaderCircle className="animate-spin text-foreground/20 h-48 w-48" />
      </div>
    </div>
  );
};

export default Loading;
