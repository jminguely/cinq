const gigs = require('../data/gigs.json');

function parseDate(input) {
  const parts = input.match(/(\d+)/g);
  // note parts[1]-1
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

const init = () => {
  console.log("you're so curious");

  const refTable = document.getElementById('table-gigs');

  gigs.forEach((gig, index) => {
    if (new Date(parseDate(gig.date)) < new Date()) {
      const newLine = refTable.insertRow(-1);
      const cellNumber = newLine.insertCell(0);
      cellNumber.appendChild(document.createTextNode(index));
      cellNumber.classList.add('text-right');
      const cellDate = newLine.insertCell(1);
      cellDate.appendChild(document.createTextNode(gig.date));
      const cellSeparator = newLine.insertCell(2);
      cellSeparator.appendChild(document.createTextNode('—'));
      const cellTitle = newLine.insertCell(3);

      if (gig.cancelled) {
        newLine.classList.add('strike');
        cellSeparator.classList.add('no-strike');
      }

      if (gig.link) {
        const createA = document.createElement('a');
        const createAText = document.createTextNode(gig.title);
        createA.setAttribute('href', gig.link);
        createA.setAttribute('target', '_blank');
        createA.appendChild(createAText);
        cellTitle.appendChild(createA);
      } else {
        cellTitle.appendChild(document.createTextNode(gig.title));
      }
    }
  });

  const lastLine = refTable.insertRow(-1);
  lastLine.insertCell();
  const cellLastLine = lastLine.insertCell();
  cellLastLine.appendChild(document.createTextNode('CONCERTS FUTURS'));
  cellLastLine.classList.add('bg-black');
  cellLastLine.colSpan = 3;

  gigs.forEach((gig, index) => {
    if (new Date(parseDate(gig.date)) > new Date()) {
      const newLine = refTable.insertRow(-1);
      const cellNumber = newLine.insertCell(0);
      cellNumber.appendChild(document.createTextNode(index));
      cellNumber.classList.add('text-right');
      const cellDate = newLine.insertCell(1);
      cellDate.appendChild(document.createTextNode(gig.date));
      const cellSeparator = newLine.insertCell(2);
      cellSeparator.appendChild(document.createTextNode('—'));
      const cellTitle = newLine.insertCell(3);

      if (gig.cancelled) {
        newLine.classList.add('strike');
        cellSeparator.classList.add('no-strike');
      }

      if (gig.link) {
        const createA = document.createElement('a');
        const createAText = document.createTextNode(gig.title);
        createA.setAttribute('href', gig.link);
        createA.setAttribute('target', '_blank');
        createA.appendChild(createAText);
        cellTitle.appendChild(createA);
      } else {
        cellTitle.appendChild(document.createTextNode(gig.title));
      }
    }
  });
};

document.addEventListener('DOMContentLoaded', init);
