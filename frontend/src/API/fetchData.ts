export const fetchData = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/subjects");
        const data = await response.json();
        return data;
    } catch(error : any) {
        console.log(error);
        throw new Error(`Error fetching subject data`);
    }
}