import { useEffect } from "react";

function Page({ title, children }) {
    useEffect(() => {
        if (title) {
            document.title = title || "Tauri Progress";
        }
    }, [title]);

    return children;
}

export default Page;
