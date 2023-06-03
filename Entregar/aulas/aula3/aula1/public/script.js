document.getElementById('generateBtn').addEventListener('click', async () => {
   const paragraphsInput = document.getElementById('paragraphs');
   const numParagraphs = parseInt(paragraphsInput.value);
 
   if (isNaN(numParagraphs) || numParagraphs < 1 || numParagraphs > 10) {
     alert('Number of paragraphs must be between 1 and 10.');
     return;
   }
 
   // Faz a requisicao para o backend informando a quantidade de paragrafo inserido pelo usuario
   const response = await fetch(`/lorem?numParagraphs=${numParagraphs}`);
   const data = await response.json();
 
   const outputDiv = document.getElementById('output');
   outputDiv.innerHTML = '';
 
   data.forEach((paragraph) => {
     const p = document.createElement('p');
     p.textContent = paragraph;
     outputDiv.appendChild(p);
   });
 });