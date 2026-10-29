let score = 0;
const scoreDisplay = document.getElementById('score-val');

const draggableElement = document.querySelectorAll('.box');
const droppableElement = document.querySelectorAll('.droppable');


const originalPositions = new Map();


draggableElement.forEach(element => {

    originalPositions.set(element, element.parentElement);

    element.addEventListener('dragstart', (drgStart) => {

        drgStart.dataTransfer.setData('text/plain', drgStart.target.id);
        drgStart.dataTransfer.setData('match-value', drgStart.target.dataset.category);
        
        drgStart.currentTarget.classList.add('draggableFormat');
        console.log('dragstart event activated!');
    });

    element.addEventListener('dragend', (drgend) => {
        drgend.currentTarget.classList.remove('draggableFormat');
    });
});


droppableElement.forEach(element => {
    element.addEventListener('dragover', (drgOverEvt) => {
        drgOverEvt.preventDefault();
    });

    element.addEventListener('drop', (drpEvt) => {
        drpEvt.preventDefault();
        

        const droppedElementId = drpEvt.dataTransfer.getData('text/plain');
        const itemMatchValue = drpEvt.dataTransfer.getData('match-value');
        

        const targetCategory = drpEvt.currentTarget.dataset.category;
        const draggedElement = document.getElementById(droppedElementId);


        if (itemMatchValue === targetCategory) {

            score += 10;
            drpEvt.currentTarget.appendChild(draggedElement);
            drpEvt.currentTarget.classList.add('correct');
        } else {

            score = Math.max(0, score - 5);
            triggerPenaltyAnimation(draggedElement);
        }


        scoreDisplay.textContent = score;
    });
});


function triggerPenaltyAnimation(element) {
    element.classList.add('shake');
    setTimeout(() => element.classList.remove('shake'), 500);
}


function resetGame() {

    score = 0;
    scoreDisplay.textContent = score;


    draggableElement.forEach(element => {
        const originalParent = originalPositions.get(element);
        if (originalParent) {
            originalParent.appendChild(element);
        }

        element.classList.remove('shake', 'draggableFormat');
    });


    droppableElement.forEach(element => {
        element.classList.remove('correct');
    });
}