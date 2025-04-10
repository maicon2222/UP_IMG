// Elementos da interface (DOM)
const elements = {
    photoGrid: document. getElementById("photoGrid"),  // container de grade de fotos 
    uploadModal: document. getElementById("uploadModal"),  // Modal de upload
    addPhotoButton: document. getElementById("addphotoBtn"), //Botão para abriri o Modal
    closeButton: document. querySelector(".close"), // Botão para fechar o Modal
    uploadForm: document. getElementById("uploadForm"), // Formulário de upload
    toast: document. getElementById("toast"), // Elemento de notificação
    nameInput: document. getElementById("name"), // Input do nome de foto
    fileInput: document. getElementById("file"), // Input do arquivo de foto
}

// Configuração da aplicação
const config = {
    apiUrl: "http://localhost:4000/pictures", // Endpoint da API
    // colocar img base 64 
};

// Função de notificação temporária
function showNotification(message, type = "success") {
    const { toast } = elements;

    toast.textContent = message; // Define o texto da menssagem 
    toast.className = `toast ${type}`; // Aplica a classe  do CSS (muda de cor)
    toast.style.opacity = "1"; // Torna a notificação visivel

    // Função de manipulação de dados
    setTimeout(() => {
        toast.style.opacity = "0"
    }, 3000);
}

// Função de manipulação de dados (busca as fotosda API)
async function fetchPhotos() {
    try {
        // faz a requisição GET na API 
        const response = await fetch(config.apiUrl);

        // se a resposta não fori completa, mostra um erro 
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        // converte a resposta para JSON 
        const data = await response.json();

        // retorna o array de fotos ou vazio se não houver dados 
        return data.pictures || [];
    } catch (error) {

        // Em caso de erro, mostra o console log 
        console.error("Falha ao carregar foto", error);
        // Mostra a notificação de erro para o user
        showNotification("Falha ao carregar fotos", "error");
        // retorna o array vazio para evitar erros no código
        return [];
    }    
}

// rederiza as fotos no Grid (Recebendo um array de objetos de foto)
function renderPhotoGrid(photos) {
    const { photoGrid } = elements;

    photoGrid.innerHTML = ""; // Limpa todo o conteúdo atual do Grid

    if (photos.length === 0) {
    photoGrid.innerHTML = '<p class="no-photos">Nenhuma foto encontrada</p>';
    return;
    }
    
    // Para cada foto no array, criarum card e adiciona ao Grid
    photos.forEach((photo) => {
        const photocard = createPhotoCardElement(photo);
        photoGrid.appendChild(photocard);
    });
    }

    // Cria o elemento HTML de um card de foto (recebe objeto da foto)
    function createPhotoCardElement(photo) {
        const card = document.createElement("div")
        card.className = "photo-card" // Aplica classe CSS para estilização
        
        // Mostra a URL (API + ID da foto + /image)
        const imageUrl = `${config.apiUrl}/${photo._id}/image`;

        card.innerHTML = `
        <img src="${imageUrl}" alt="${photo.name}"
            onerror="this.onerror=null; this.src='${config.placeholderImage}'">
        <div class="photo-info">
            <div class="photo-name">${photo.name}</div>
        </div>
        `;

    }

    // Função de gerenciamento (CRUD), envia a foto para o servidor com o formData
    async function uploadNewPhoto(formData) {
        try {
            // Faz requisição POST para a API com os dados do formulário
            const response = await fetch(config.apiUrl, {
                method: "POST",
                body: formData,
            });

            // Verifica se houve resposta, se não retorna erro
            if(!response.ok) {
                throw new Error("Falha no upload da foto");
            }

            // Exibe uma notificação para o User
            showNotification("foto enviada com sucesso!");
            // Chama a função para fechar o Model
            closseUploadModal();
            // Reseta os campos do formulario
            elements.uploadForm.reset();
            // Recarrega a lista de fotos para mostar a nova foto
            loadAnDisplayPhotos();
        } catch (error) {
            // Mostra no console o erro
            console.error("Erro no upload:", error);
            // Mostra notificação para o usuario
            showNotification("Falha ao enviar foto", "error");
        }
    }

    /* Função controle de Interface*/

    // Abre o model de Upload (mostra a janela de adicionar foto)
    function openUploadModal() {
        elements.uploadModal.style.display = "block"; // Muda o CSS para black (visivel)
    }

    function closeUploadModal() {
        elements.uploadModal.style.display = "none";// Muda o CSS para none (Invisivel)
    }
    
    // Fecha modal ao clicar fora dela 
    function handleOutsideClick(event) {
        // verifica se o click foi no model (Area escura ao redor)
        if (event.target === elements.uploadModal) {
            closeUploadModal();
        }
    }

    // Processa o envio do formulário
    function handleFormSubmit(event) {
        event.preventDefault(); // Impede o recarregmento da página
        const formData = new FormData();
        formData.append("name", elements.nameInput.value); // Adiciona o nome da foto
        formData.append("file", elements.fileInput.files[0]); // Adiciona o arquivo
     
        // Chama a função de Upload
        uploadNewPhoto(photos);
    }

    // Função principal de carregamento
    async function loadAnDisplayPhotos() {
        const photos = await fetchPhotos(); //Busca as fotos e aguarda
        renderPhotoGrid(photos); // Rederiza as fotos no Grid
    }

    // Configura todos os eventos da aplicação (centraliza a configuração)
    function setupEventListeners() {
        // Botão "Adicionar foto" abre o modal
        elements.addPhotoButton.addEventListener("click", openUploadModal);
        // Botão "X" fecha o moal
        elements.closeButton.addEventListener("click", closeUploadModal);
        // Click fora do modal (fechar)
        window.uploadForm.addEventListener("click", handleOutsideClick);
        // Submit do formulário chama a função de upload
        elements.uploadForm.addEventListener("submit", handleFormSubmit);
    }

    /* Inicialização da aplicação */

    // Inicia a aplicação quando o DOM estiver pronto
    document.addEventListener("DOMContentLoaded", () => {
        setupEventListeners(); // configura todos os eventos
        loadAnDisplayPhotos(); // carrega e exibe as fotos iniciais
    });