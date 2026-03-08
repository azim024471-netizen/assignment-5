
const cardContainer = document.getElementById('card-container');
const allIssue = document.getElementById('all-issue');

let allProblems = [];

async function loadProblems() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const information = await res.json();
  allProblems = information.data;
  
  displayProblem(allProblems);
}


const displayProblem = (problems) => {
        cardContainer.innerHTML = '';
    problems.forEach(problem => {
        // console.log(problem.createdAt);
        const card = document.createElement("div");
        card.className =`w-72 h-72 bg-white rounded-xl shadow border-t-4 ${problem.status === 'open' ? "border-green-500": "border-purple-500" } overflow-hidden`;

        card.innerHTML = `
        <div onclick="problemDetails(${problem.id})" class="p-5">
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
        <h3 class="font-semibold text-sm text-gray-800 mb-2">
           ${problem.title}
        </h3>
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
    displayProblem(allProblems);
    
    } 
    else if (id === 'open-btn') {
        console.log('open', id)
        const openIssues = allProblems.filter(issue=> issue.status === 'open');
        displayProblem(openIssues);
    } 
    else if (id === 'closed-btn') {
    console.log('closed ', id )
     const closedIssues = allProblems.filter(data=> data.status === 'closed');
        displayProblem(closedIssues);
    }

 }
    const problemDetails = async(id)=>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();

    displayModal(details.data)
        console.log('clicked', details);
     }
        //another function
//         {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

     const displayModal = (information)=> {
        const modalBox = document.getElementById('modal');
      modalBox.innerHTML =`
        <div class="modal-box max-w-2xl p-8 rounded-2xl shadow-2xl border space-y-6  border-gray-100">
    
    <div class="modal-heading">
        <h2 class="text-2xl font-bold  mb-3">${information.title}</h2>
<div class="flex items-center gap-3 mb-6">
    <p class="text-white px-4 py-1 rounded-full text-xs font-medium uppercase
  ${information.status === 'open' 
    ? 'bg-green-500' 
    : 'bg-red-400'}">
  ${information.status}
</p>
     <p class="text-gray-400 text-sm">
  • Opened by ${information.author} • ${new Date(information.createdAt).toLocaleDateString()}
</p>
    </div>
    </div>
    
    <div class="modal-level flex gap-2">
      <p class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs font-medium border border-red-200 ">
        BUG
      </p>
      <p class="bg-yellow-100 text-yellow-500 px-3 py-1 rounded-full text-xs font-medium border border-yellow-200">
         HELP WANTED
      </p>
    </div>
    <div class="modal-description">
        <p class="text-gray-500 ">
      ${information.description}
    </p>
    </div>

    <div class="modal-footer  bg-[#F8FAFC] p-6 rounded-lg flex gap-52 items-center">
      <div>
        <span class="text-gray-400 text-sm block mb-1">Assignee:</span>
        <span class="text-slate-800 font-semibold"> ${information.assignee || 'Not Assigned'}</span>
      </div>
      <div class="text-right">
        <span class="text-gray-400 text-sm block mb-1">Priority:</span>

        <span class=" text-white px-4 py-1 rounded-full text-xs font-medium 
        ${information.priority === 'low' 
    ? 'bg-gray-500 text-white' 
    : information.priority === 'medium' 
    ? 'bg-yellow-500 text-white' 
    : 'bg-red-500 text-white'}">${information.priority.toUpperCase()}</span>
      </div>
    </div>

    <div class="modal-action">
      <form method="dialog">
        <button class="btn bg-indigo-600  text-white border-none px-6 rounded-sm font-semibold text-lg">
          Close
        </button>
      </form>
    </div>
  </div>
      `
        modalBox.showModal();
     } 


     document.getElementById('search-btn').addEventListener('click', function(){
        const input = document.getElementById('search-input');
        const searchValue = input.value;
        console.log(searchValue)
     })