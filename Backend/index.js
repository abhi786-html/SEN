document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSection = document.querySelector('.content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Highlight the active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Fetch articles based on the selected category
            const category = button.getAttribute('data-tab');
            fetch('backend.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `category=${category}`
                })
                .then(response => response.json())
                .then(articles => {
                    contentSection.innerHTML = ''; // Clear existing content
                    articles.forEach(article => {
                        contentSection.innerHTML += `
                            <div class="article">
                                <h2>${article.title}</h2>
                                <p class="author">By ${article.author}</p>
                                <p class="date">${article.date}</p>
                                <img src="${article.image_url}" alt="${article.title}">
                                <p>${article.description}</p>
                            </div>
                        `;
                    });
                })
                .catch(error => console.error('Error fetching articles:', error));
        });
    });
});