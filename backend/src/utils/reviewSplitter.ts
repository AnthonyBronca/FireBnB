

const reviewSplitter = (rev: string): string[] => {
    if (!Array.isArray(rev)) {
        const revWords = rev.split(" ");
        const res: string[] = ["", ""];
        if(revWords.length > 5){
            const prev = revWords.slice(0, 5);
            res[0] = prev.join(' ');
            res[1] = rev
        } else{
            res[1] = rev
        }
        return res
    }
    return rev;
}


export default reviewSplitter;
