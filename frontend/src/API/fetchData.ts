export const fetchData = async () => {
    // Api call to fetch json data from the backend
  try {
    const response = await fetch("http://localhost:3000/api/subjects");
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error fetching subject data`);
  }
};
