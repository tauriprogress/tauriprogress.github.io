import { useEffect } from "react";

function Page({ title, children }) {
    useEffect(() => {
        document.title = title || "Tauri Progress";
    }, [title]);

    return children;
}

export default Page;
