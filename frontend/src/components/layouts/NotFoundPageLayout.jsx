import React from "react";
import { Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import { Button } from "../ui/button";

function NotFoundPageLayout() {
  return (
    <div className="h-dvh text-white bg-[var(--bg-primary)]">
      <div className="wrap-1395 flex-col !text-center gap-8 items-center justify-center h-full flex">
        <h1 className="!text-9xl tracking-wider">
          4<span className="text-[var(--text-secondary)]">0</span>4
        </h1>
        <p className="text-lg font-semibold tracking-wide text-muted-foreground">
          Looks like this page got lost somewhere along the way. <br />
          Let’s get you back to where you started.
        </p>
        <Button
          asChild
          className="border-2 text-lg py-6 px-6 border-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)] flex items-center gap-4 w-fit"
        >
          <Link to="/">
            <FaBackward />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPageLayout;
