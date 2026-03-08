
const cardContainer = document.getElementById('card-container');
const allIssue = document.getElementById('all-issue');

let allProblems = [];

async function loadProblems() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const information = await res.json();
  const allProblems = information.data;
  
  displayProblem(allProblems);
}


const displayProblem = (problems) => {
        
    problems.forEach(problem => {
        // console.log(problem.createdAt);
        const card = document.createElement("div");
        card.className =`w-72 h-72 bg-white rounded-xl shadow border-t-4 ${problem.status === 'open' ? "border-green-500": "border-purple-500" } overflow-hidden`;

        card.innerHTML = `
        <div class="p-5">
        <!-- Top row -->
        <div class="flex items-center justify-between mb-3">
            <div class="w-6 h-6  rounded-full flex items-center justify-center
             ${problem.status === 'open' ? "bg-green-100" : "bg-purple-100"}">

                 <img src= ${problem.status === 'open' ? "assets/Open-Status.png" : "assets/Closed-status.png"}> 
            </div>

            <span class="text-xs px-6 py-1.5 rounded-full 
  ${problem.priority === 'low' 
    ? 'bg-gray-200 text-gray-500' 
    : problem.priority === 'medium' 
    ? 'bg-yellow-100 text-yellow-500' 
    : 'bg-red-100 text-red-500'}">
  ${problem.priority.toUpperCase()}
</span>
        </div>

        <!-- Title -->
        <h3 class="font-semibold text-sm text-gray-800 mb-2">
           ${problem.title}
        </h3>

        <!-- Description -->
        <p class="text-xs text-gray-500 mb-4 line-clamp-2 ">
            ${problem.description}
        </p>

        <!-- Tags -->
        <div class="flex gap-2 mb-3">
            <span class="text-xs px-3 py-1 border bg-red-100 border-red-300 text-red-500 rounded-full"> 
                BUG
            </span>
            <span class="text-xs px-3 py-1 border border-yellow-400 bg-yellow-100 text-yellow-600 rounded-full">
                HELP WANTED
            </span>
        </div>
    
    <!-- Bottom Section -->
    <div class="border-t border-gray-200 px-5 py-4 text-xs space-y-2 text-gray-500">
        <p>#1  ${problem.author}</p>
        <p>${new Date(problem.updatedAt).toLocaleDateString()}</p>
    </div>
           </div>
        `
         cardContainer.appendChild(card);
allIssue.innerText = cardContainer.children.length;
    });

    
      
}






loadProblems();

 const buttonClick = (id) => {

    const allBTn = document.querySelectorAll('.issue-btn')
    allBTn.forEach(btn => {
        btn.classList.remove('btn-primary', 'btn-active');
    });
       const clickedBtn = document.getElementById(id);
       clickedBtn.classList.add('btn-primary', 'btn-active');


if (id === 'all-issue-btn') {

    console.log('all', id, allProblems)
    
    } 
    else if (id === 'open-btn') {
        console.log('open', id)
    } 
    else if (id === 'closed-btn') {
    console.log('closed ', id )
    }



 }





     