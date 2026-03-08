console.log('connected');

const cardContainer = document.getElementById('card-container');


async function loadProblems() {
  
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const information = await res.json();
 
  displayProblem(information.data);
  console.log(information.data);
}



const displayProblem = (problems) => {
 
    problems.forEach(problem => {
        console.log(problem.createdAt);
        const card = document.createElement("div");
        card.className =`w-72 h-72 bg-white rounded-xl shadow border-t-4 ${problem.status === 'open' ? "border-green-500": "border-purple-500" } overflow-hidden`;

        card.innerHTML = `
        <div class="p-5">
        <!-- Top row -->
        <div class="flex items-center justify-between mb-3">
            <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <img src="assets/Open-Status.png" >
            </div>

            <span class="text-xs px-6 py-1.5 bg-red-100 text-red-500 rounded-full">
                HIGH
            </span>
        </div>

        <!-- Title -->
        <h3 class="font-semibold text-sm text-gray-800 mb-2">
           ${problem.title}
        </h3>

        <!-- Description -->
        <p class="text-xs text-gray-500 mb-4">
            The navigation menu doesn't collapse properly on mobile devices...
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
        <p>#1 by john_doe</p>
        <p>1/15/2024</p>
    </div>

           </div>

        `
         
         cardContainer.appendChild(card);
console.log(card)





    });









}



loadProblems()