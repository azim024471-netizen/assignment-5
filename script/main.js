console.log('connected');


async function loadProblems() {
  
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const information = await res.json();
 
  displayProblem(information.data);
  console.log(information.data);
}



const displayProblem = (problems) => {
 
    problems.forEach(problem => {
        console.log(problem.createdAt) 
        
    });


}



loadProblems()