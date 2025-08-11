"use server";

export async function exampleAction() {
    console.log("Example action called");
// do some math
    const result = 1 + 1;
    return result;
}

export async function exampleAction2() {
    console.log("Example action 2 called");
    const result = 2 + 2;
    return result;
}

// a server action that takes a file and uploads it to the server
export async function uploadFile(file: File) {
    console.log("Uploading file", file);
    const result = await fetch("/api/upload", {
        method: "POST",
        body: file,
    });
    return result;
}