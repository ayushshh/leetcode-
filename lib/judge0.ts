import axios from "axios";

export function getJudgeZeroId(language: string | undefined) {
    if (typeof language !== "string") {
        return;
    }

    const languageMap: Record<string, number> = {
        "PYTHON": 71,
        "GO": 60,
        "JAVASCRIPT": 63,
        "JAVA": 62,
        "CPP": 54
    };

    return languageMap[language.toUpperCase()];
}


export async function submitBach(submission: Array<object>) {
    if (!process.env.JUDGE0_API_URL) {
        return;
    }
    const { data } = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, { submissions: submission }, {
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
        }
    });
    console.log("batch submission response", data);
    return data;
}

export async function pollBatchResults(tokens: Array<string>) {
    if (!process.env.JUDGE0_API_URL) {
        return;
    }
    while (true) {
        const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
            params: {
                tokens: tokens.join(","),
                base64_encoded: false
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
            }
        });
        console.log("batch poll response", data);
        const results = data.submissions;

        const isAllDone = results.every((r: { status: { id: string | number } }) => r.status.id !== 1 && r.status.id !== 2);
        if (isAllDone) return results;
        await new Promise((resolve) => { setTimeout(resolve, 1000) });
    }
}