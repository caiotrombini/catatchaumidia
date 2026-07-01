// Lógica da Aplicação - Portal do Aluno Gaia
// Versão 2.0 - 12 Abas Completas

document.addEventListener("DOMContentLoaded", () => {
  
  // Estado do Aplicativo
  let currentStudent = null;

  // Seletores do Login
  const loginContainer = document.getElementById("login-container");
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("login-error");

  // Seletores do Dashboard e Perfil
  const dashboardContainer = document.getElementById("dashboard-container");
  const userAvatar = document.getElementById("user-avatar");
  const userAvatarMobile = document.getElementById("user-avatar-mobile");
  const userDisplayName = document.getElementById("user-display-name");
  const userDisplayNameMobile = document.getElementById("user-display-name-mobile");
  const userCourseLabel = document.getElementById("user-course-label");
  const userSignTag = document.getElementById("user-sign-tag");
  const userSignTagMobile = document.getElementById("user-sign-tag-mobile");
  const userFirstName = document.getElementById("user-first-name");
  const academicRegNumber = document.getElementById("academic-reg-number");
  const academicSemester = document.getElementById("academic-semester");
  const academicStatusValue = document.getElementById("academic-status-value");

  // Carteirinha
  const studentCardImg = document.getElementById("student-card-img");

  // Containers de dados
  const profileDetailsGrid = document.getElementById("profile-details-grid");
  const coursesCardsContainer = document.getElementById("courses-cards-container");
  const boletimTableBody = document.getElementById("boletim-table-body");
  const historicoTableBody = document.getElementById("historico-table-body");
  const statsCardsContainer = document.getElementById("stats-cards-container");
  const progressSection = document.getElementById("progress-section");
  const projectsContainer = document.getElementById("projects-container");
  const tccContainer = document.getElementById("tcc-container");
  const certificadosTableBody = document.getElementById("certificados-table-body");
  const certTotalHours = document.getElementById("cert-total-hours");
  const financeiroTableBody = document.getElementById("financeiro-table-body");
  const financeSummary = document.getElementById("finance-summary");
  const bibliotecaTableBody = document.getElementById("biblioteca-table-body");
  const eventsContainer = document.getElementById("events-container");
  const declarationTextContent = document.getElementById("declaration-text-content");
  const declarationText2 = document.getElementById("declaration-text-2");
  const declarationCurrentDate = document.getElementById("declaration-current-date");
  const declarationHash = document.getElementById("declaration-hash");

  // Ações
  const btnLogout = document.getElementById("btn-logout");
  const btnLogoutMobile = document.getElementById("btn-logout-mobile");
  const btnPrintCard = document.getElementById("btn-print-card");
  const btnDownloadCard = document.getElementById("btn-download-card");
  const btnPrintDeclaration = document.getElementById("btn-print-declaration");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileNavMenu = document.getElementById("mobile-nav-menu");

  // Mapeamento de Símbolos dos Signos
  const signSymbols = {
    "Áries": "♈", "Touro": "♉", "Gêmeos": "♊", "Câncer": "♋",
    "Leão": "♌", "Virgem": "♍", "Libra": "♎", "Escorpião": "♏",
    "Sagitário": "♐", "Capricórnio": "♑", "Aquário": "♒", "Peixes": "♓"
  };

  // --- 1. LOGIN ---
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginError.classList.add("hidden");
    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const student = studentsDatabase[username];

    if (student) {
      const encodedPassword = btoa(password);
      if (student.passwordHash === encodedPassword) {
        currentStudent = student;
        initDashboard(student);
      } else { showLoginError(); }
    } else { showLoginError(); }
  });

  function showLoginError() {
    loginError.classList.remove("hidden");
    const card = document.querySelector(".login-card");
    card.classList.add("shake-effect");
    setTimeout(() => card.classList.remove("shake-effect"), 500);
  }

  // --- 2. INICIALIZAR DASHBOARD ---
  function initDashboard(student) {
    loginContainer.classList.add("hidden");
    dashboardContainer.classList.remove("hidden");
    passwordInput.value = "";

    // Perfil Lateral
    userAvatar.src = student.avatar;
    userAvatarMobile.src = student.avatar;
    userDisplayName.textContent = student.nome;
    userDisplayNameMobile.textContent = student.nome.split(" ")[0];
    userCourseLabel.textContent = student.curso;
    
    const signSymbol = signSymbols[student.signo] || "🌌";
    userSignTag.innerHTML = `<i class="fa-solid fa-compass"></i> ${student.signo} ${signSymbol}`;
    userSignTagMobile.innerHTML = `${student.signo} ${signSymbol}`;

    // Header
    userFirstName.textContent = student.nome.split(" ")[0];
    academicRegNumber.textContent = student.matricula;
    academicSemester.textContent = student.semestreAtual;
    academicStatusValue.textContent = student.status;

    // Carteirinha
    studentCardImg.src = student.cardImage;

    // Renderizar todas as abas
    renderProfile(student);
    renderCourses(student.cursos);
    renderBoletim(student.cursos);
    renderHistorico(student);
    renderProjects(student.projetos);
    renderTCC(student.tcc);
    renderCertificados(student.certificados);
    renderFinanceiro(student.financeiro);
    renderBiblioteca();
    renderMaterial();
    renderEventos(student.eventos);
    renderDeclaration(student);
  }

  // --- 3. DADOS PESSOAIS ---
  function renderProfile(s) {
    const fields = [
      { icon: "fa-user", label: "Nome Completo", value: s.nome },
      { icon: "fa-id-card", label: "CPF", value: s.cpf },
      { icon: "fa-address-card", label: "RG", value: s.rg },
      { icon: "fa-cake-candles", label: "Data de Nascimento", value: s.dataNascimento },
      { icon: "fa-map-pin", label: "Naturalidade", value: s.naturalidade },
      { icon: "fa-flag", label: "Nacionalidade", value: s.nacionalidade },
      { icon: "fa-envelope", label: "E-mail", value: s.email },
      { icon: "fa-phone", label: "Telefone", value: s.telefone },
      { icon: "fa-location-dot", label: "Endereço", value: s.endereco },
      { icon: "fa-graduation-cap", label: "Curso", value: s.curso },
      { icon: "fa-users", label: "Turma", value: s.turma },
      { icon: "fa-moon", label: "Turno", value: s.turno },
      { icon: "fa-calendar-plus", label: "Data da Matrícula", value: s.dataMatricula },
      { icon: "fa-calendar-check", label: "Previsão de Conclusão", value: s.previsaoConclusao },
      { icon: "fa-hashtag", label: "Matrícula", value: s.matricula },
      { icon: "fa-circle-check", label: "Status", value: s.status },
      { icon: "fa-sun", label: "Signo Solar", value: `${s.signo} ${signSymbols[s.signo] || ""}` },
      { icon: "fa-arrow-up", label: "Ascendente", value: `${s.ascendente} ${signSymbols[s.ascendente] || ""}` },
      { icon: "fa-moon", label: "Lua", value: `${s.lua} ${signSymbols[s.lua] || ""}` },
      { icon: "fa-chart-line", label: "Coeficiente de Rendimento", value: s.coeficienteRendimento },
      { icon: "fa-ranking-star", label: "Posição na Turma", value: s.posicaoTurma },
      { icon: "fa-percent", label: "Frequência Geral", value: s.frequenciaGeral },
      { icon: "fa-star", label: "Média Geral", value: s.mediaGeral },
      { icon: "fa-coins", label: "Créditos Concluídos", value: `${s.creditosConcluidos} / ${s.creditosTotais}` }
    ];

    profileDetailsGrid.innerHTML = fields.map(f => `
      <div class="profile-field">
        <div class="profile-field-icon"><i class="fa-solid ${f.icon}"></i></div>
        <div class="profile-field-content">
          <span class="profile-field-label">${f.label}</span>
          <span class="profile-field-value">${f.value}</span>
        </div>
      </div>
    `).join("");
  }

  // --- 4. CURSOS ---
  function renderCourses(cursos) {
    coursesCardsContainer.innerHTML = "";
    cursos.forEach(curso => {
      const freqNum = parseInt(curso.frequencia);
      const isCompleted = curso.status === "Aprovado";
      const r = 40;
      const circ = 2 * Math.PI * r;
      const offset = circ - (freqNum / 100) * circ;

      const card = document.createElement("div");
      card.className = "course-card";
      card.innerHTML = `
        <div class="course-card-header">
          <div class="course-code-badge">${curso.codigo}</div>
          <h3>${curso.nome}</h3>
          <div class="course-meta">
            <span><i class="fa-solid fa-clock"></i> ${curso.cargaHoraria} · ${curso.creditos} créd.</span>
            <span><i class="fa-solid fa-user-tie"></i> ${curso.professor}</span>
          </div>
          <p class="course-ementa">${curso.ementa}</p>
        </div>
        <div class="course-card-body">
          <div class="attendance-chart">
            <svg width="90" height="90">
              <circle class="circle-bg" cx="45" cy="45" r="${r}"></circle>
              <circle class="circle-val" cx="45" cy="45" r="${r}" 
                stroke-dasharray="${circ}" stroke-dashoffset="${offset}"
                style="stroke: ${freqNum < 90 ? 'var(--color-orange)' : 'var(--color-blue)'}"></circle>
            </svg>
            <div class="attendance-text">${curso.frequencia}</div>
          </div>
          <div class="academic-details">
            <div class="detail-item">
              <span class="detail-label">Nota Final</span>
              <span class="detail-value ${curso.nota && curso.nota >= 9 ? 'high-score' : ''}">${curso.nota != null ? curso.nota.toFixed(1) : '—'}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Faltas</span>
              <span class="detail-value" style="color: ${curso.faltas > (curso.limiteFaltas * 0.7) ? 'var(--color-orange)' : 'var(--color-text-white)'}">
                ${curso.faltas} / ${curso.limiteFaltas}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Semestre</span>
              <span class="detail-value" style="font-size:12px;color:var(--color-text-muted)">${curso.semestre}</span>
            </div>
          </div>
        </div>
        <div class="course-card-footer">
          <span>Status</span>
          <span class="status-badge ${isCompleted ? 'completed' : 'in-progress'}">${curso.status}</span>
        </div>
      `;
      coursesCardsContainer.appendChild(card);
    });
  }

  // --- 5. BOLETIM ---
  function renderBoletim(cursos) {
    boletimTableBody.innerHTML = "";
    cursos.forEach(curso => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><span class="course-code-inline">${curso.codigo}</span></td>
        <td><strong>${curso.nome}</strong></td>
        <td style="color:var(--color-text-muted);font-size:12px">${curso.semestre}</td>
        <td>${curso.cargaHoraria}</td>
        <td>${curso.creditos}</td>
        <td>${curso.notaP1 != null ? curso.notaP1.toFixed(1) : '—'}</td>
        <td>${curso.notaP2 != null ? curso.notaP2.toFixed(1) : '—'}</td>
        <td>${curso.notaTrabalho != null ? curso.notaTrabalho.toFixed(1) : '—'}</td>
        <td><strong style="color:${curso.nota && curso.nota >= 9 ? '#ff9b52' : 'var(--color-text-white)'}">${curso.nota != null ? curso.nota.toFixed(1) : '—'}</strong></td>
        <td><strong>${curso.frequencia}</strong></td>
        <td><span style="color: ${curso.faltas > (curso.limiteFaltas * 0.7) ? 'var(--color-orange)' : 'var(--color-text-white)'}">${curso.faltas}</span> / ${curso.limiteFaltas}</td>
        <td><span class="status-badge ${curso.status === 'Aprovado' ? 'completed' : 'in-progress'}">${curso.status}</span></td>
      `;
      boletimTableBody.appendChild(tr);
    });
  }

  // --- 6. HISTÓRICO ESCOLAR ---
  function renderHistorico(student) {
    // Stats cards
    statsCardsContainer.innerHTML = `
      <div class="stat-card">
        <div class="stat-icon"><i class="fa-solid fa-chart-line"></i></div>
        <div class="stat-info"><span class="stat-value">${student.coeficienteRendimento}</span><span class="stat-label">CR (Coef. Rendimento)</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon"><i class="fa-solid fa-ranking-star"></i></div>
        <div class="stat-info"><span class="stat-value">${student.posicaoTurma}</span><span class="stat-label">Posição na Turma</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon"><i class="fa-solid fa-coins"></i></div>
        <div class="stat-info"><span class="stat-value">${student.creditosConcluidos}/${student.creditosTotais}</span><span class="stat-label">Créditos</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon"><i class="fa-solid fa-percent"></i></div>
        <div class="stat-info"><span class="stat-value">${student.frequenciaGeral}</span><span class="stat-label">Frequência Geral</span></div>
      </div>
    `;

    // Tabela
    historicoTableBody.innerHTML = "";
    student.historico.forEach(sem => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${sem.semestre}</strong></td>
        <td>${sem.disciplinas}</td>
        <td>${sem.creditosConcluidos}</td>
        <td><strong>${sem.media != null ? sem.media.toFixed(2) : '—'}</strong></td>
        <td><span class="status-badge ${sem.situacao === 'Regular' ? 'completed' : 'in-progress'}">${sem.situacao}</span></td>
      `;
      historicoTableBody.appendChild(tr);
    });

    // Barra de progresso
    const pct = Math.round((student.creditosConcluidos / student.creditosTotais) * 100);
    progressSection.innerHTML = `
      <div class="progress-card">
        <h3><i class="fa-solid fa-rocket"></i> Progresso Geral do Curso</h3>
        <div class="progress-bar-wrapper">
          <div class="progress-bar-fill" style="width: ${pct}%"></div>
        </div>
        <div class="progress-info">
          <span>${student.creditosConcluidos} créditos concluídos de ${student.creditosTotais}</span>
          <span class="progress-pct">${pct}%</span>
        </div>
      </div>
    `;
  }

  // --- 7. PROJETOS ---
  function renderProjects(projetos) {
    projectsContainer.innerHTML = projetos.map(p => `
      <div class="project-card">
        <div class="project-type-badge">${p.tipo}</div>
        <h3>${p.titulo}</h3>
        <p class="project-desc">${p.descricao}</p>
        <div class="project-meta">
          <span><i class="fa-solid fa-user-tie"></i> ${p.orientador}</span>
          <span><i class="fa-solid fa-calendar"></i> ${p.dataEntrega}</span>
        </div>
        <div class="project-footer">
          <span class="status-badge ${p.status === 'Concluído' ? 'completed' : 'in-progress'}">${p.status}</span>
          ${p.nota != null ? `<span class="project-grade"><i class="fa-solid fa-star"></i> ${p.nota.toFixed(1)}</span>` : ''}
        </div>
      </div>
    `).join("");
  }

  // --- 8. TCC ---
  function renderTCC(tcc) {
    const statusColors = { "Concluído": "completed", "Em andamento": "in-progress", "Pendente": "pending", "Proposta aprovada": "in-progress" };
    
    tccContainer.innerHTML = `
      <div class="tcc-main-card">
        <div class="tcc-header">
          <h3>${tcc.titulo}</h3>
          <span class="status-badge ${statusColors[tcc.status] || 'in-progress'}">${tcc.status}</span>
        </div>
        <div class="tcc-info-grid">
          <div class="tcc-info-item"><span class="tcc-info-label">Orientador</span><span class="tcc-info-value">${tcc.orientador}</span></div>
          <div class="tcc-info-item"><span class="tcc-info-label">Início</span><span class="tcc-info-value">${tcc.dataInicio}</span></div>
          <div class="tcc-info-item"><span class="tcc-info-label">Previsão de Entrega</span><span class="tcc-info-value">${tcc.previsaoEntrega}</span></div>
          <div class="tcc-info-item"><span class="tcc-info-label">Progresso</span><span class="tcc-info-value">${tcc.progresso}%</span></div>
        </div>

        <div class="tcc-progress-section">
          <h4>Progresso do TCC</h4>
          <div class="progress-bar-wrapper">
            <div class="progress-bar-fill tcc-bar" style="width: ${tcc.progresso}%"></div>
          </div>
        </div>

        <div class="tcc-resumo">
          <h4><i class="fa-solid fa-scroll"></i> Resumo</h4>
          <p>${tcc.resumo}</p>
        </div>

        <div class="tcc-keywords">
          <h4><i class="fa-solid fa-tags"></i> Palavras-chave</h4>
          <div class="keyword-tags">
            ${tcc.palavrasChave.map(k => `<span class="keyword-tag">${k}</span>`).join("")}
          </div>
        </div>

        <div class="tcc-chapters">
          <h4><i class="fa-solid fa-list-ol"></i> Capítulos</h4>
          <div class="chapters-list">
            ${tcc.capitulos.map((c, i) => `
              <div class="chapter-item">
                <span class="chapter-number">${i + 1}</span>
                <span class="chapter-title">${c.titulo}</span>
                <span class="status-badge ${c.status === 'Concluído' ? 'completed' : c.status === 'Em andamento' ? 'in-progress' : 'pending'}">${c.status}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  // --- 9. CERTIFICADOS ---
  function renderCertificados(certs) {
    certificadosTableBody.innerHTML = "";
    let totalHours = 0;
    certs.forEach(c => {
      totalHours += parseInt(c.cargaHoraria);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${c.titulo}</strong></td>
        <td>${c.cargaHoraria}</td>
        <td>${c.data}</td>
        <td>${c.emissor}</td>
      `;
      certificadosTableBody.appendChild(tr);
    });
    certTotalHours.innerHTML = `
      <div class="cert-summary-card">
        <i class="fa-solid fa-award"></i>
        <div>
          <span class="cert-total-label">Total de Horas Complementares</span>
          <span class="cert-total-value">${totalHours}h</span>
        </div>
      </div>
    `;
  }

  // --- 10. FINANCEIRO ---
  function renderFinanceiro(parcelas) {
    // Resumo
    let totalPago = 0;
    let totalAberto = 0;
    let qtdPago = 0;
    let qtdAberto = 0;
    parcelas.forEach(p => {
      const val = parseFloat(p.valor.replace("R$ ", "").replace(".", "").replace(",", "."));
      if (p.status === "Pago") { totalPago += val; qtdPago++; }
      else { totalAberto += val; qtdAberto++; }
    });

    financeSummary.innerHTML = `
      <div class="finance-card paid">
        <i class="fa-solid fa-circle-check"></i>
        <div>
          <span class="finance-label">Total Pago (${qtdPago} parcelas)</span>
          <span class="finance-value">R$ ${totalPago.toFixed(2).replace(".", ",")}</span>
        </div>
      </div>
      <div class="finance-card pending">
        <i class="fa-solid fa-clock"></i>
        <div>
          <span class="finance-label">Em Aberto (${qtdAberto} parcela${qtdAberto > 1 ? 's' : ''})</span>
          <span class="finance-value">R$ ${totalAberto.toFixed(2).replace(".", ",")}</span>
        </div>
      </div>
    `;

    // Tabela
    financeiroTableBody.innerHTML = "";
    parcelas.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${p.referencia}</strong></td>
        <td>${p.valor}</td>
        <td>${p.vencimento}</td>
        <td>${p.dataPagamento || '—'}</td>
        <td><span class="status-badge ${p.status === 'Pago' ? 'completed' : 'pending'}">${p.status}</span></td>
      `;
      financeiroTableBody.appendChild(tr);
    });
  }

  // --- 11. BIBLIOTECA (EDITÁVEL COM CRUD + LOCALSTORAGE) ---
  let editingBookIndex = -1; // -1 = adding, >= 0 = editing

  function getLibraryKey() {
    return `gaia_biblioteca_${currentStudent.username}`;
  }

  function loadBooks() {
    const saved = localStorage.getItem(getLibraryKey());
    if (saved) return JSON.parse(saved);
    return [...currentStudent.biblioteca]; // clone default
  }

  function saveBooks(books) {
    localStorage.setItem(getLibraryKey(), JSON.stringify(books));
  }

  function renderBiblioteca() {
    const books = loadBooks();
    bibliotecaTableBody.innerHTML = "";
    books.forEach((l, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${l.titulo}</strong></td>
        <td>${l.autor}</td>
        <td>${l.dataEmprestimo}</td>
        <td>${l.dataDevolucao}</td>
        <td><span class="status-badge ${l.status === 'Devolvido' ? 'completed' : 'in-progress'}">${l.status}</span></td>
        <td class="action-btns">
          <button class="btn-icon btn-edit-book" data-index="${index}" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-icon btn-delete-book" data-index="${index}" title="Remover"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      bibliotecaTableBody.appendChild(tr);
    });

    // Attach edit handlers
    document.querySelectorAll('.btn-edit-book').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        const books = loadBooks();
        const book = books[idx];
        editingBookIndex = idx;
        document.getElementById('book-modal-title').textContent = 'Editar Empréstimo';
        document.getElementById('book-title').value = book.titulo;
        document.getElementById('book-author').value = book.autor;
        document.getElementById('book-borrow').value = book.dataEmprestimo;
        document.getElementById('book-return').value = book.dataDevolucao;
        document.getElementById('book-status').value = book.status;
        document.getElementById('book-modal').classList.remove('hidden');
      });
    });

    // Attach delete handlers
    document.querySelectorAll('.btn-delete-book').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('Tem certeza que deseja remover este empréstimo?')) return;
        const idx = parseInt(btn.dataset.index);
        const books = loadBooks();
        books.splice(idx, 1);
        saveBooks(books);
        renderBiblioteca();
      });
    });
  }

  // Modal: Add Book
  const btnAddBook = document.getElementById('btn-add-book');
  const bookModal = document.getElementById('book-modal');
  const btnCancelBook = document.getElementById('btn-cancel-book');
  const btnSaveBook = document.getElementById('btn-save-book');

  btnAddBook.addEventListener('click', () => {
    editingBookIndex = -1;
    document.getElementById('book-modal-title').textContent = 'Adicionar Empréstimo';
    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-borrow').value = '';
    document.getElementById('book-return').value = '';
    document.getElementById('book-status').value = 'Em posse';
    bookModal.classList.remove('hidden');
  });

  btnCancelBook.addEventListener('click', () => {
    bookModal.classList.add('hidden');
  });

  btnSaveBook.addEventListener('click', () => {
    const titulo = document.getElementById('book-title').value.trim();
    const autor = document.getElementById('book-author').value.trim();
    const dataEmprestimo = document.getElementById('book-borrow').value.trim();
    const dataDevolucao = document.getElementById('book-return').value.trim();
    const status = document.getElementById('book-status').value;

    if (!titulo || !autor) {
      alert('Preencha ao menos o título e o autor.');
      return;
    }

    const books = loadBooks();
    const newBook = { titulo, autor, dataEmprestimo: dataEmprestimo || '—', dataDevolucao: dataDevolucao || '—', status };

    if (editingBookIndex >= 0) {
      books[editingBookIndex] = newBook;
    } else {
      books.push(newBook);
    }

    saveBooks(books);
    bookModal.classList.add('hidden');
    renderBiblioteca();
  });

  // Close modal on overlay click
  bookModal.addEventListener('click', (e) => {
    if (e.target === bookModal) bookModal.classList.add('hidden');
  });

  // --- 12. MATERIAL DIDÁTICO (20 PDFs) ---
  const materialGrid = document.getElementById('material-grid');

  const materialDidatico = [
    { filename: "01_fundamentos_astrologia.pdf", title: "Fundamentos da Astrologia Hermética", subtitle: "Módulo 1", icon: "fa-star" },
    { filename: "02_signos_zodiacais.pdf", title: "Os 12 Signos do Zodíaco", subtitle: "Módulo 2", icon: "fa-sun" },
    { filename: "03_planetas_dignidades.pdf", title: "Planetas e Dignidades Essenciais", subtitle: "Módulo 3", icon: "fa-globe" },
    { filename: "04_casas_astrologicas.pdf", title: "As 12 Casas Astrológicas", subtitle: "Módulo 4", icon: "fa-house" },
    { filename: "05_aspectos_planetarios.pdf", title: "Aspectos Planetários", subtitle: "Módulo 5", icon: "fa-arrows-spin" },
    { filename: "06_mapa_natal.pdf", title: "O Mapa Natal: Cálculo e Interpretação", subtitle: "Módulo 6", icon: "fa-compass" },
    { filename: "07_transitos_progressoes.pdf", title: "Trânsitos e Progressões", subtitle: "Módulo 7", icon: "fa-route" },
    { filename: "08_astrologia_horaria.pdf", title: "Astrologia Horária", subtitle: "Módulo 8", icon: "fa-clock" },
    { filename: "09_sinastria.pdf", title: "Sinastria e Astrologia de Relacionamentos", subtitle: "Módulo 9", icon: "fa-heart" },
    { filename: "10_astrologia_medieval.pdf", title: "Astrologia Medieval e Renascentista", subtitle: "Módulo 10", icon: "fa-chess-rook" },
    { filename: "11_astronomia_aplicada.pdf", title: "Astronomia Aplicada à Astrologia", subtitle: "Módulo 11", icon: "fa-satellite" },
    { filename: "12_astrologia_mundana.pdf", title: "Astrologia Mundana", subtitle: "Módulo 12", icon: "fa-earth-americas" },
    { filename: "13_astrologia_eletiva.pdf", title: "Astrologia Eletiva", subtitle: "Módulo 13", icon: "fa-calendar-check" },
    { filename: "14_mitologia_astrologica.pdf", title: "Mitologia e Simbologia Astrológica", subtitle: "Módulo 14", icon: "fa-book-skull" },
    { filename: "15_estrelas_fixas.pdf", title: "Estrelas Fixas na Astrologia", subtitle: "Módulo 15", icon: "fa-sparkles" },
    { filename: "16_retorno_saturno.pdf", title: "O Retorno de Saturno", subtitle: "Módulo 16", icon: "fa-ring" },
    { filename: "17_eclipses.pdf", title: "Eclipses e seus Efeitos", subtitle: "Módulo 17", icon: "fa-circle-half-stroke" },
    { filename: "18_astrologia_financeira.pdf", title: "Astrologia Financeira", subtitle: "Módulo 18", icon: "fa-coins" },
    { filename: "19_astrologia_psicologica.pdf", title: "Astrologia e Psicologia", subtitle: "Módulo 19", icon: "fa-brain" },
    { filename: "20_etica_pratica.pdf", title: "Ética e Prática Profissional", subtitle: "Módulo 20", icon: "fa-scale-balanced" },
  ];

  function renderMaterial() {
    materialGrid.innerHTML = materialDidatico.map((m, i) => `
      <div class="material-card">
        <div class="material-icon"><i class="fa-solid ${m.icon}"></i></div>
        <div class="material-info">
          <span class="material-subtitle">${m.subtitle}</span>
          <h3>${m.title}</h3>
          <span class="material-filename"><i class="fa-solid fa-file-pdf"></i> ${m.filename}</span>
        </div>
        <a href="assets/pdfs/${m.filename}" download class="btn-download-pdf" title="Baixar PDF">
          <i class="fa-solid fa-download"></i>
        </a>
      </div>
    `).join("");
  }

  // --- 13. EVENTOS ---
  function renderEventos(eventos) {
    eventsContainer.innerHTML = eventos.map(e => `
      <div class="event-card">
        <div class="event-type-badge">${e.tipo}</div>
        <h3>${e.nome}</h3>
        <div class="event-meta">
          <span><i class="fa-solid fa-calendar-days"></i> ${e.data}</span>
          <span><i class="fa-solid fa-user-check"></i> ${e.participacao}</span>
        </div>
        <div class="event-footer">
          ${e.certificado ? '<span class="cert-issued"><i class="fa-solid fa-certificate"></i> Certificado emitido</span>' : '<span class="no-cert">Sem certificado</span>'}
        </div>
      </div>
    `).join("");
  }

  // --- 14. DECLARAÇÃO ---
  function renderDeclaration(student) {
    const dataAtual = new Date();
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const dataFormatada = `São Paulo, ${dataAtual.getDate()} de ${meses[dataAtual.getMonth()]} de ${dataAtual.getFullYear()}.`;
    declarationCurrentDate.textContent = dataFormatada;

    const hashData = `${student.username}-${student.matricula}-${dataAtual.getFullYear()}`;
    const hash = "GEA-" + btoa(hashData).replace(/=/g, "").toUpperCase().substring(0, 16);
    declarationHash.textContent = hash;

    declarationTextContent.innerHTML = `
      Declaramos para os devidos fins de direito que o(a) estudante <strong>${student.nome}</strong>, portador(a) do documento de identidade CPF/CIN sob o nº <strong>${student.cpf}</strong>, nascido(a) em <strong>${student.dataNascimento}</strong>, está regularmente matriculado(a) e com frequência ativa nesta instituição de ensino sob o Registro Acadêmico nº <strong>${student.matricula}</strong>, cursando atualmente a formação profissionalizante em <strong>${student.curso}</strong>.
    `;
    declarationText2.innerHTML = `
      O(A) referido(a) discente encontra-se no <strong>${student.semestreAtual}</strong> do curso, tendo concluído <strong>${student.creditosConcluidos}</strong> créditos de um total de <strong>${student.creditosTotais}</strong>, com Coeficiente de Rendimento (CR) de <strong>${student.coeficienteRendimento}</strong> e frequência geral de <strong>${student.frequenciaGeral}</strong>. A previsão de conclusão do curso é <strong>${student.previsaoConclusao}</strong>.
    `;
  }

  // --- 15. NAVEGAÇÃO DE ABAS (DESKTOP) ---
  const navItems = document.querySelectorAll(".nav-item");
  const tabPanes = document.querySelectorAll(".tab-pane");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const tabId = item.getAttribute("data-tab");
      navItems.forEach(nav => nav.classList.remove("active"));
      tabPanes.forEach(pane => pane.classList.remove("active"));
      item.classList.add("active");
      document.getElementById(`tab-${tabId}`).classList.add("active");
    });
  });

  // --- 16. NAVEGAÇÃO DE ABAS (MOBILE) ---
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
  mobileNavItems.forEach(item => {
    item.addEventListener("click", () => {
      const tabId = item.getAttribute("data-tab");
      mobileNavItems.forEach(nav => nav.classList.remove("active"));
      item.classList.add("active");
      navItems.forEach(nav => {
        if (nav.getAttribute("data-tab") === tabId) nav.classList.add("active");
        else nav.classList.remove("active");
      });
      tabPanes.forEach(pane => pane.classList.remove("active"));
      document.getElementById(`tab-${tabId}`).classList.add("active");
      mobileNavMenu.classList.add("hidden");
    });
  });

  mobileMenuToggle.addEventListener("click", () => {
    mobileNavMenu.classList.toggle("hidden");
  });

  // --- 17. LOGOUT ---
  function logout() {
    currentStudent = null;
    dashboardContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
    usernameInput.value = "";
    mobileNavMenu.classList.add("hidden");
    // Reset navigation
    navItems.forEach(nav => nav.classList.remove("active"));
    tabPanes.forEach(pane => pane.classList.remove("active"));
    document.querySelector('[data-tab="carteirinha"]').classList.add("active");
    document.getElementById("tab-carteirinha").classList.add("active");
  }

  btnLogout.addEventListener("click", logout);
  btnLogoutMobile.addEventListener("click", logout);

  // --- 18. AÇÕES DE IMPRESSÃO ---
  btnPrintCard.addEventListener("click", () => window.print());
  btnPrintDeclaration.addEventListener("click", () => window.print());

  // --- 19. DOWNLOAD DA CARTEIRINHA ---
  btnDownloadCard.addEventListener("click", () => {
    const link = document.createElement("a");
    const nameSanitized = currentStudent.nome.toLowerCase().replace(/\s+/g, "_");
    link.download = `carteirinha_${nameSanitized}.jpg`;
    link.href = currentStudent.cardImage;
    link.click();
  });

});
