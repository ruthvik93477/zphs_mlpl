/**
 * ZPHS MLPL — High School Academic Marks & Ranking System
 * Pure Vanilla JavaScript Client Application
 */

// Application State
const state = {
  students: [],
  subjects: ['Telugu', 'Hindi', 'English', 'Maths', 'Physics', 'Biology', 'Social'],
  tests: Array.from({ length: 30 }, (_, i) => `Test-${i + 1}`),
  selectedStudent: null,
  currentTest: 'Test-1',
  currentGroupFilter: 'Group-X', // 'Group-X', 'Group-Y', 'Group-Z', 'all'
  rankingsData: [],
  activeSort: 'rank-asc',
  rankSearchQuery: '',
  manageSearchQuery: '',
  manageFilterTest: '',
  manageFilterStudent: '',

  // Upload Marks (Class / Batch Entry) State
  upload: {
    testName: 'Test-1',
    subject: 'Telugu',
    group: 'Group-X',
    globalMax: 20,
    searchQuery: '',
    marksMap: new Map() // studentId -> { rawMarks, maxMarks, scaledMarks, status, markId }
  },

  // Parent Portal State
  parentPortal: {
    selectedStudentId: '',
    reportData: null,
    groupFilter: 'all',
    searchQuery: '',
    showConductedOnly: true
  }
};

// Helper to get max scaled marks for subject: Physics & Biology scaled to 50, other subjects to 100
function getMaxScaledForSubject(subject) {
  return (subject === 'Physics' || subject === 'Biology') ? 50 : 100;
}

// ================= DOM ELEMENTS =================
const elements = {
  // Navigation & Status
  navBtns: document.querySelectorAll('.nav-btn'),
  tabPanes: document.querySelectorAll('.tab-pane'),
  dbStatusBadge: document.getElementById('db-status-badge'),
  dbStatusText: document.getElementById('db-status-text'),

  // Upload Marks (Batch Entry) Elements
  uploadTestSelect: document.getElementById('upload-test-select'),
  uploadSubjectSelect: document.getElementById('upload-subject-select'),
  uploadGlobalMaxRadios: document.querySelectorAll('input[name="uploadGlobalMax"]'),
  uploadGrpBtns: document.querySelectorAll('.upload-grp-btn'),
  uploadStudentSearch: document.getElementById('upload-student-search'),
  uploadTableBody: document.getElementById('upload-table-body'),
  uploadMobileCards: document.getElementById('upload-mobile-cards'),
  saveAllUploadBtn: document.getElementById('save-all-upload-btn'),
  mobileSaveAllBtn: document.getElementById('mobile-save-all-btn'),
  uploadPendingCount: document.getElementById('upload-pending-count'),
  uploadSummaryText: document.getElementById('upload-summary-text'),
  uploadEnteredBadge: document.getElementById('upload-entered-badge'),
  mobileSaveCountText: document.getElementById('mobile-save-count-text'),

  // Marks Entry Form
  marksForm: document.getElementById('marks-entry-form'),
  studentSearchInput: document.getElementById('student-search-input'),
  studentDropdownList: document.getElementById('student-dropdown-list'),
  toggleStudentDropdown: document.getElementById('toggle-student-dropdown'),
  selectedStudentId: document.getElementById('selected-student-id'),
  selectedStudentBadge: document.getElementById('selected-student-badge'),
  previewNameText: document.getElementById('preview-name-text'),
  previewGroupBadge: document.getElementById('preview-group-badge'),
  previewSectionBadge: document.getElementById('preview-section-badge'),
  previewPhoneText: document.getElementById('preview-phone-text'),
  testSelect: document.getElementById('test-select'),
  subjectSelect: document.getElementById('subject-select'),
  rawMarksInput: document.getElementById('raw-marks-input'),
  calcScoredVal: document.getElementById('calc-scored-val'),
  calcMaxVal: document.getElementById('calc-max-val'),
  calcScaledVal: document.getElementById('calc-scaled-val'),
  calcProgressFill: document.getElementById('calc-progress-fill'),
  entryAlertBox: document.getElementById('entry-alert-box'),
  summaryTestTag: document.getElementById('summary-test-tag'),
  studentSummaryContent: document.getElementById('student-summary-content'),

  // Rankings & Reports
  rankingsTestSelect: document.getElementById('rankings-test-select'),
  rankTabBtns: document.querySelectorAll('.rank-tab-btn'),
  rankSearchInput: document.getElementById('rank-search-input'),
  rankSortSelect: document.getElementById('rank-sort-select'),
  rankingsTableBody: document.getElementById('rankings-table-body'),
  rankingsResultsCount: document.getElementById('rankings-results-count'),
  downloadExcelBtn: document.getElementById('download-excel-btn'),
  downloadAllGroupsExcelBtn: document.getElementById('download-all-groups-excel-btn'),

  // Parent Portal Elements
  parentStudentSelect: document.getElementById('parent-student-select'),
  parentStudentSearch: document.getElementById('parent-student-search'),
  parentSearchResults: document.getElementById('parent-search-results'),
  parentGrpFilters: document.querySelectorAll('.parent-grp-filter'),
  parentEmptyState: document.getElementById('parent-empty-state'),
  parentReportContainer: document.getElementById('parent-report-container'),
  parentPrintReportBtn: document.getElementById('parent-print-report-btn'),
  parentDownloadExcelBtn: document.getElementById('parent-download-excel-btn'),
  parentWhatsappBtn: document.getElementById('parent-whatsapp-btn'),
  parentStudentAvatar: document.getElementById('parent-student-avatar'),
  parentStudentName: document.getElementById('parent-student-name'),
  parentGroupBadge: document.getElementById('parent-group-badge'),
  parentSectionBadge: document.getElementById('parent-section-badge'),
  parentRollNumber: document.getElementById('parent-roll-number'),
  parentStudentId: document.getElementById('parent-student-id'),
  parentPhoneNumber: document.getElementById('parent-phone-number'),
  kpiTestsAttempted: document.getElementById('kpi-tests-attempted'),
  kpiCumulativeAvg: document.getElementById('kpi-cumulative-avg'),
  kpiBestTest: document.getElementById('kpi-best-test'),
  kpiBestSub: document.getElementById('kpi-best-sub'),
  kpiWeakSub: document.getElementById('kpi-weak-sub'),
  parentSubjectBars: document.getElementById('parent-subject-bars'),
  parentToggleAllTests: document.getElementById('parent-toggle-all-tests'),
  toggleTestsLabel: document.getElementById('toggle-tests-label'),
  parentReportTableBody: document.getElementById('parent-report-table-body'),
  printStudentName: document.getElementById('print-student-name'),
  printStudentId: document.getElementById('print-student-id'),
  printRollNumber: document.getElementById('print-roll-number'),
  printGroup: document.getElementById('print-group'),
  printSection: document.getElementById('print-section'),
  printPhone: document.getElementById('print-phone'),
  printCumulativeAvg: document.getElementById('print-cumulative-avg'),
  printGeneratedDate: document.getElementById('print-generated-date'),
  printMarksTableBody: document.getElementById('print-marks-table-body'),

  // Manage Marks
  manageTestSelect: document.getElementById('manage-test-select'),
  manageStudentSelect: document.getElementById('manage-student-select'),
  manageSearchInput: document.getElementById('manage-search-input'),
  manageTableBody: document.getElementById('manage-table-body'),
  resetSampleBtn: document.getElementById('reset-sample-btn'),

  // Directory
  directoryTableBody: document.getElementById('directory-table-body'),

  // Modal Edit
  editModal: document.getElementById('edit-mark-modal'),
  closeModalBtn: document.getElementById('close-modal-btn'),
  cancelModalBtn: document.getElementById('cancel-modal-btn'),
  editMarkForm: document.getElementById('edit-mark-form'),
  editMarkId: document.getElementById('edit-mark-id'),
  editStudentName: document.getElementById('edit-student-name'),
  editTestName: document.getElementById('edit-test-name'),
  editSubjectName: document.getElementById('edit-subject-name'),
  editRawMarks: document.getElementById('edit-raw-marks'),
  editScaledPreview: document.getElementById('edit-scaled-preview'),

  // Toast
  toastContainer: document.getElementById('toast-container')
};

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', async () => {
  setupNavigation();
  populateDropdowns();
  setupUploadMarksControls();
  setupCalculationListeners();
  setupStudentSearchDropdown();
  setupRankingsControls();
  setupParentPortalControls();
  setupManageMarksControls();
  setupModalEvents();

  // Load initial data
  await checkSystemStatus();
  await loadStudents();
  await loadUploadMarksData();
  await loadRankings();
  await loadManageMarks();
  renderDirectoryTable();
});

// Check Server & MongoDB Connection Status
async function checkSystemStatus() {
  try {
    const res = await fetch('/api/status');
    const data = await res.json();
    if (data.mongoConnected) {
      elements.dbStatusBadge.className = 'stat-pill db-pill';
      elements.dbStatusText.textContent = 'MongoDB Atlas/Local: Connected';
    } else {
      elements.dbStatusBadge.className = 'stat-pill';
      elements.dbStatusBadge.style.background = 'rgba(245, 158, 11, 0.15)';
      elements.dbStatusBadge.style.color = '#f59e0b';
      elements.dbStatusText.textContent = 'Active (In-Memory Fallback)';
    }
  } catch (err) {
    console.warn('Status check failed:', err);
    elements.dbStatusText.textContent = 'Offline Mode';
  }
}

// Navigation Tabs
function setupNavigation() {
  elements.navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      elements.navBtns.forEach(b => b.classList.remove('active'));
      elements.tabPanes.forEach(pane => pane.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) targetPane.classList.add('active');

      // Refresh appropriate views
      if (targetTab === 'tab-upload-marks') {
        loadUploadMarksData();
      } else if (targetTab === 'tab-rankings') {
        loadRankings();
      } else if (targetTab === 'tab-manage') {
        loadManageMarks();
      } else if (targetTab === 'tab-parent-portal') {
        if (state.parentPortal.selectedStudentId) {
          loadParentReport(state.parentPortal.selectedStudentId);
        }
      }
    });
  });
}

// Populate Static Dropdowns
function populateDropdowns() {
  // Test selects (1 to 30)
  elements.testSelect.innerHTML = '';
  elements.rankingsTestSelect.innerHTML = '';
  elements.manageTestSelect.innerHTML = '<option value="">All Tests</option>';
  if (elements.uploadTestSelect) elements.uploadTestSelect.innerHTML = '';

  state.tests.forEach(test => {
    const opt1 = new Option(test, test);
    const opt2 = new Option(test, test);
    const opt3 = new Option(test, test);
    elements.testSelect.add(opt1);
    elements.rankingsTestSelect.add(opt2);
    elements.manageTestSelect.add(opt3);
    if (elements.uploadTestSelect) {
      elements.uploadTestSelect.add(new Option(test, test));
    }
  });
}

// Fetch 69 Students from Backend
async function loadStudents() {
  try {
    const res = await fetch('/api/students');
    const data = await res.json();
    state.students = data.students || [];

    // Populate manage-student-select
    elements.manageStudentSelect.innerHTML = '<option value="">All 69 Students</option>';
    state.students.forEach(s => {
      const label = `${s.name} (${s.group}, Sec ${s.section}) - ${s.phoneNumber}`;
      elements.manageStudentSelect.add(new Option(label, s.studentId));
    });

    renderStudentOptions(state.students);
    populateParentStudentDropdown();
  } catch (err) {
    showToast('Failed to load students: ' + err.message, 'error');
  }
}

// ================= SEARCHABLE COMBOBOX (69 STUDENTS) =================
// Supports typing letters in ANY order to filter (e.g. "x 5", "5 x", "sec a", "11", "9848")
function setupStudentSearchDropdown() {
  const input = elements.studentSearchInput;
  const list = elements.studentDropdownList;
  const toggle = elements.toggleStudentDropdown;

  input.addEventListener('focus', () => {
    renderStudentOptions(filterStudents(input.value));
    list.classList.add('show');
  });

  input.addEventListener('input', () => {
    renderStudentOptions(filterStudents(input.value));
    list.classList.add('show');
  });

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (list.classList.contains('show')) {
      list.classList.remove('show');
    } else {
      renderStudentOptions(filterStudents(input.value));
      list.classList.add('show');
      input.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.searchable-combobox')) {
      list.classList.remove('show');
    }
  });
}

function filterStudents(query) {
  if (!query || !query.trim()) return state.students;
  const tokens = query.toLowerCase().trim().split(/\s+/);

  return state.students.filter(student => {
    const searchable = `${student.name} ${student.studentId} ${student.group} ${student.section} ${student.phoneNumber} section ${student.section}`.toLowerCase();
    // Student matches only if ALL tokens appear in any order
    return tokens.every(token => searchable.includes(token));
  });
}

function renderStudentOptions(studentsList) {
  const list = elements.studentDropdownList;
  list.innerHTML = '';

  if (studentsList.length === 0) {
    list.innerHTML = `<div style="padding: 1rem; color: #94a3b8; text-align: center;">No students match your search.</div>`;
    return;
  }

  studentsList.forEach(student => {
    const item = document.createElement('div');
    item.className = 'student-option-item';
    
    let groupBadgeClass = 'badge-x';
    if (student.group === 'Group-Y') groupBadgeClass = 'badge-y';
    if (student.group === 'Group-Z') groupBadgeClass = 'badge-z';

    item.innerHTML = `
      <div class="option-left">
        <span class="option-name">${student.name}</span>
        <span class="badge ${groupBadgeClass}">${student.group}</span>
        <span class="badge badge-sec-${student.section.toLowerCase()}">Sec ${student.section}</span>
      </div>
      <div class="option-meta">
        📞 ${student.phoneNumber}
      </div>
    `;

    item.addEventListener('click', () => {
      selectStudent(student);
      list.classList.remove('show');
    });

    list.appendChild(item);
  });
}

function selectStudent(student) {
  state.selectedStudent = student;
  elements.studentSearchInput.value = student.name;
  elements.selectedStudentId.value = student.studentId;

  // Update preview badge
  elements.previewNameText.textContent = student.name;
  elements.previewGroupBadge.textContent = student.group;
  elements.previewGroupBadge.className = `badge ${student.group === 'Group-X' ? 'badge-x' : student.group === 'Group-Y' ? 'badge-y' : 'badge-z'}`;
  elements.previewSectionBadge.textContent = `Section ${student.section}`;
  elements.previewSectionBadge.className = `badge badge-sec-${student.section.toLowerCase()}`;
  elements.previewPhoneText.textContent = student.phoneNumber;
  elements.selectedStudentBadge.classList.remove('hidden');

  // Clear input field for fresh entry
  elements.rawMarksInput.value = '';
  elements.calcScoredVal.textContent = '0';
  elements.calcScaledVal.textContent = '0';
  elements.calcProgressFill.style.width = '0%';

  // Load summary for this student in current test
  loadStudentSummary(student.studentId, elements.testSelect.value);
}

// ================= LIVE CALCULATION (TO 100 OR 50) =================
function setupCalculationListeners() {
  const rawInput = elements.rawMarksInput;
  const maxRadios = document.querySelectorAll('input[name="maxMarks"]');

  function updateCalculation() {
    const raw = parseFloat(rawInput.value) || 0;
    const maxRadio = document.querySelector('input[name="maxMarks"]:checked');
    const max = maxRadio ? parseFloat(maxRadio.value) : 20;
    const subject = elements.subjectSelect ? elements.subjectSelect.value : '';
    const targetScale = getMaxScaledForSubject(subject);

    elements.calcScoredVal.textContent = raw;
    elements.calcMaxVal.textContent = max;

    const multVal = document.getElementById('calc-mult-val');
    if (multVal) multVal.textContent = targetScale;
    const scoreSuffix = document.getElementById('calc-score-suffix');
    if (scoreSuffix) scoreSuffix.textContent = `/ ${targetScale} Marks`;

    if (raw > max) {
      elements.calcScaledVal.textContent = 'Invalid!';
      elements.calcScaledVal.style.color = '#dc2626';
      elements.calcProgressFill.style.width = '100%';
      elements.calcProgressFill.style.background = '#dc2626';
    } else {
      const scaled = Math.round(((raw / max) * targetScale) * 100) / 100;
      elements.calcScaledVal.textContent = scaled.toFixed(2);
      elements.calcScaledVal.style.color = '#166534';
      const pctOfMax = (scaled / targetScale) * 100;
      elements.calcProgressFill.style.width = `${Math.min(100, Math.max(0, pctOfMax))}%`;
      elements.calcProgressFill.style.background = pctOfMax >= 75 ? '#16a34a' : pctOfMax >= 50 ? '#d97706' : '#dc2626';
    }
  }

  rawInput.addEventListener('input', updateCalculation);
  maxRadios.forEach(radio => radio.addEventListener('change', updateCalculation));

  // Subject select change clears input field so it's blank and ready for new marks
  elements.subjectSelect.addEventListener('change', () => {
    elements.rawMarksInput.value = '';
    updateCalculation();
  });

  // Test select change updates summary and clears input
  elements.testSelect.addEventListener('change', () => {
    elements.rawMarksInput.value = '';
    updateCalculation();
    if (state.selectedStudent) {
      loadStudentSummary(state.selectedStudent.studentId, elements.testSelect.value);
    }
  });

  // Marks Form Submission
  elements.marksForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleMarksSubmission();
  });
}

// Submit Marks to Backend
async function handleMarksSubmission() {
  const studentId = elements.selectedStudentId.value;
  const testName = elements.testSelect.value;
  const subject = elements.subjectSelect.value;
  const maxRadio = document.querySelector('input[name="maxMarks"]:checked');
  const maxMarks = maxRadio ? Number(maxRadio.value) : 20;
  const rawMarks = Number(elements.rawMarksInput.value);

  if (!studentId) {
    showAlert('Please select a student from the dropdown list.', 'error');
    elements.studentSearchInput.focus();
    return;
  }

  if (rawMarks > maxMarks) {
    showAlert(`Marks scored (${rawMarks}) cannot exceed exam max marks (${maxMarks})!`, 'error');
    return;
  }

  try {
    const res = await fetch('/api/marks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId,
        testName,
        subject,
        maxMarks,
        rawMarks
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to save marks');
    }

    const targetScale = getMaxScaledForSubject(subject);
    showToast(`✅ Saved: ${studentId} scored ${rawMarks}/${maxMarks} (${data.record.scaledMarks}/${targetScale}) in ${subject}`, 'success');
    showAlert(`Successfully saved marks for ${studentId} in ${subject}! Scaled: ${data.record.scaledMarks} / ${targetScale} marks.`, 'success');

    // Refresh summary
    loadStudentSummary(studentId, testName);

    // Refresh rankings in background if active
    if (testName === elements.rankingsTestSelect.value) {
      loadRankings();
    }

    // Clear raw marks for next entry
    elements.rawMarksInput.value = '';
    elements.rawMarksInput.focus();

  } catch (err) {
    showAlert(err.message, 'error');
  }
}

function showAlert(msg, type) {
  elements.entryAlertBox.textContent = msg;
  elements.entryAlertBox.className = `alert-box ${type}`;
  elements.entryAlertBox.classList.remove('hidden');
  setTimeout(() => {
    elements.entryAlertBox.classList.add('hidden');
  }, 6000);
}

// Load Student Summary (7 Subjects) in Selected Test
async function loadStudentSummary(studentId, testName) {
  elements.summaryTestTag.textContent = testName;
  try {
    const res = await fetch(`/api/marks?testName=${encodeURIComponent(testName)}&studentId=${encodeURIComponent(studentId)}`);
    const data = await res.json();
    const marks = data.marks || [];

    const map = new Map(marks.map(m => [m.subject, m]));
    let totalScaled = 0;
    let count = 0;

    let html = `<div class="subject-marks-grid">`;
    state.subjects.forEach(sub => {
      const rec = map.get(sub);
      const subMax = getMaxScaledForSubject(sub);
      if (rec) {
        totalScaled += rec.scaledMarks;
        count++;
        html += `
          <div class="subject-item-row entered">
            <span class="sub-name">📖 ${sub}</span>
            <span class="sub-score">${rec.rawMarks} / ${rec.maxMarks} &rarr; <strong>${rec.scaledMarks}</strong> / ${subMax}</span>
          </div>
        `;
      } else {
        html += `
          <div class="subject-item-row">
            <span class="sub-name" style="color: #94a3b8;">📖 ${sub}</span>
            <span class="sub-score" style="color: #94a3b8; font-weight: 500;">Not entered</span>
          </div>
        `;
      }
    });

    const percent = Math.round((totalScaled / 600) * 100 * 10) / 10;
    html += `</div>
      <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--gray-200); display: flex; justify-content: space-between; align-items: baseline;">
        <div>
          <span style="font-size: 0.85rem; color: var(--gray-500); font-weight: 600;">TOTAL MARKS (${count}/7 Subjects):</span>
          <div style="font-size: 1.5rem; font-weight: 800; font-family: var(--font-mono); color: #166534;">
            ${totalScaled.toFixed(2)} <span style="font-size: 0.9rem; font-weight: 600; color: #15803d;">/ 600</span>
          </div>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.85rem; color: var(--gray-500); font-weight: 600;">PERCENTAGE:</span>
          <div style="font-size: 1.35rem; font-weight: 800; font-family: var(--font-mono); color: var(--primary);">
            ${percent}%
          </div>
        </div>
      </div>
    `;

    elements.studentSummaryContent.innerHTML = html;
  } catch (err) {
    console.error('Error loading student summary:', err);
  }
}

// ================= UPLOAD MARKS (CLASS / BATCH ENTRY) =================
function setupUploadMarksControls() {
  if (!elements.uploadTestSelect) return;

  // 1. Test selection change
  elements.uploadTestSelect.addEventListener('change', () => {
    state.upload.testName = elements.uploadTestSelect.value;
    loadUploadMarksData();
  });

  // 2. Subject selection change
  elements.uploadSubjectSelect.addEventListener('change', () => {
    state.upload.subject = elements.uploadSubjectSelect.value;
    loadUploadMarksData();
  });

  // 3. Exam conducted for (Global Max Marks: 20, 25, 50, 100)
  elements.uploadGlobalMaxRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const newMax = Number(radio.value);
      state.upload.globalMax = newMax;
      const targetScale = getMaxScaledForSubject(state.upload.subject);

      // Update max marks for all students that are not already saved
      state.students.forEach(student => {
        const current = state.upload.marksMap.get(student.studentId);
        if (!current || current.status !== 'saved') {
          const raw = current ? current.rawMarks : '';
          const scaled = (raw !== '' && !isNaN(raw)) ? Math.round(((Number(raw) / newMax) * targetScale) * 100) / 100 : null;
          state.upload.marksMap.set(student.studentId, {
            rawMarks: raw,
            maxMarks: newMax,
            scaledMarks: scaled,
            status: (raw !== '' && !isNaN(raw)) ? 'dirty' : 'empty'
          });
        }
      });

      renderUploadView();
      showToast(`Default exam max marks set to ${newMax} for all students`, 'success');
    });
  });

  // 4. Group Filter Tabs (Group-X, Group-Y, Group-Z, All)
  elements.uploadGrpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.uploadGrpBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.upload.group = btn.getAttribute('data-group');
      renderUploadView();
    });
  });

  // 5. Quick Search input
  if (elements.uploadStudentSearch) {
    elements.uploadStudentSearch.addEventListener('input', () => {
      state.upload.searchQuery = elements.uploadStudentSearch.value.trim().toLowerCase();
      renderUploadView();
    });
  }

  // 6. Save All Buttons (Desktop & Mobile)
  if (elements.saveAllUploadBtn) {
    elements.saveAllUploadBtn.addEventListener('click', saveAllUploadMarks);
  }
  if (elements.mobileSaveAllBtn) {
    elements.mobileSaveAllBtn.addEventListener('click', saveAllUploadMarks);
  }
}

// Fetch existing marks for selected test and subject
async function loadUploadMarksData() {
  const testName = elements.uploadTestSelect ? elements.uploadTestSelect.value : state.upload.testName;
  const subject = elements.uploadSubjectSelect ? elements.uploadSubjectSelect.value : state.upload.subject;
  state.upload.testName = testName;
  state.upload.subject = subject;

  // Clear marks map immediately so fields are fresh and empty for the selected subject
  state.upload.marksMap.clear();

  try {
    const res = await fetch(`/api/marks?testName=${encodeURIComponent(testName)}&subject=${encodeURIComponent(subject)}`);
    const data = await res.json();
    const existingMarks = (data.marks || []).filter(m => m.subject === subject);

    const targetScale = getMaxScaledForSubject(subject);

    // Fill with existing saved marks for this subject only
    existingMarks.forEach(m => {
      const computedScaled = (m.rawMarks !== null && m.rawMarks !== undefined && m.maxMarks)
        ? Math.round(((Number(m.rawMarks) / Number(m.maxMarks)) * targetScale) * 100) / 100
        : m.scaledMarks;

      state.upload.marksMap.set(m.studentId, {
        rawMarks: m.rawMarks,
        maxMarks: m.maxMarks,
        scaledMarks: computedScaled,
        status: 'saved',
        markId: m._id
      });
    });

    renderUploadView();
  } catch (err) {
    console.error('Failed to load upload marks data:', err);
    showToast('Failed to load existing marks: ' + err.message, 'error');
    renderUploadView();
  }
}

// Render Desktop Table and Mobile Cards
function renderUploadView() {
  if (!elements.uploadTableBody || !elements.uploadMobileCards) return;

  // 1. Filter students by group
  let filtered = [...state.students];
  if (state.upload.group && state.upload.group !== 'all') {
    filtered = filtered.filter(s => s.group === state.upload.group);
  }

  // 2. Filter by search query if any
  if (state.upload.searchQuery) {
    const queryTokens = state.upload.searchQuery.split(/\s+/);
    filtered = filtered.filter(s => {
      const str = `${s.name} ${s.studentId} ${s.group} ${s.section} ${s.phoneNumber}`.toLowerCase();
      return queryTokens.every(tok => str.includes(tok));
    });
  }

  // Update summary header
  let groupLabel = 'All 69 Students';
  if (state.upload.group === 'Group-X') groupLabel = 'Group-X (11 Students)';
  else if (state.upload.group === 'Group-Y') groupLabel = 'Group-Y (18 Students)';
  else if (state.upload.group === 'Group-Z') groupLabel = 'Group-Z (40 Students)';

  let enteredCount = 0;
  let dirtyCount = 0;
  filtered.forEach(s => {
    const m = state.upload.marksMap.get(s.studentId);
    if (m && m.rawMarks !== '' && m.rawMarks !== null && !isNaN(m.rawMarks)) {
      enteredCount++;
      if (m.status === 'dirty' || m.status === 'empty') {
        dirtyCount++;
      }
    }
  });

  if (elements.uploadSummaryText) {
    elements.uploadSummaryText.textContent = `Showing ${filtered.length} students of ${groupLabel}`;
  }
  if (elements.uploadEnteredBadge) {
    elements.uploadEnteredBadge.textContent = `${enteredCount} / ${filtered.length} Entered`;
  }
  if (elements.uploadPendingCount) {
    elements.uploadPendingCount.textContent = enteredCount;
  }
  if (elements.mobileSaveCountText) {
    elements.mobileSaveCountText.textContent = `${enteredCount} / ${filtered.length} Filled`;
  }

  // Render Desktop & Mobile
  renderDesktopUploadTable(filtered);
  renderMobileUploadCards(filtered);
}

// Render Desktop Table
function renderDesktopUploadTable(studentsList) {
  const tbody = elements.uploadTableBody;
  tbody.innerHTML = '';

  const targetScale = getMaxScaledForSubject(state.upload.subject);
  const countingTh = document.getElementById('upload-counting-marks-th');
  if (countingTh) countingTh.textContent = `Counting Marks (/${targetScale})`;

  if (studentsList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 2rem; color: #94a3b8;">No students match your search.</td></tr>`;
    return;
  }

  studentsList.forEach((s, idx) => {
    const markData = state.upload.marksMap.get(s.studentId) || {
      rawMarks: '',
      maxMarks: state.upload.globalMax,
      scaledMarks: null,
      status: 'empty'
    };
    const tr = document.createElement('tr');
    tr.id = `row-desk-${s.studentId}`;

    let groupBadgeClass = 'badge-x';
    if (s.group === 'Group-Y') groupBadgeClass = 'badge-y';
    if (s.group === 'Group-Z') groupBadgeClass = 'badge-z';

    const maxVal = markData.maxMarks || state.upload.globalMax;
    const rawVal = markData.rawMarks !== '' && markData.rawMarks !== null ? markData.rawMarks : '';
    const scaledVal = markData.scaledMarks !== null ? markData.scaledMarks.toFixed(2) : '—';

    let badgeClass = '';
    if (markData.scaledMarks !== null) {
      const pct = (markData.scaledMarks / targetScale) * 100;
      if (pct >= 75) badgeClass = 'high';
      else if (pct >= 50) badgeClass = 'medium';
      else badgeClass = 'low';
    }

    let statusHtml = '<span class="status-indicator status-empty">⚪ Empty</span>';
    if (markData.status === 'saved') {
      statusHtml = '<span class="status-indicator status-saved">✅ Saved</span>';
    } else if (markData.status === 'dirty') {
      statusHtml = '<span class="status-indicator status-unsaved">🟡 Unsaved</span>';
    }

    tr.innerHTML = `
      <td style="font-family: var(--font-mono); font-weight: 700; color: #64748b;">#${s.rollNumber}</td>
      <td><strong>${s.name}</strong></td>
      <td>
        <span class="badge ${groupBadgeClass}">${s.group}</span>
        <span class="badge badge-sec-${s.section.toLowerCase()}">Sec ${s.section}</span>
      </td>
      <td class="phone-cell">📞 ${s.phoneNumber}</td>
      <td>
        <select class="upload-max-select" data-student-id="${s.studentId}">
          <option value="20" ${maxVal == 20 ? 'selected' : ''}>20 M</option>
          <option value="25" ${maxVal == 25 ? 'selected' : ''}>25 M</option>
          <option value="50" ${maxVal == 50 ? 'selected' : ''}>50 M</option>
          <option value="100" ${maxVal == 100 ? 'selected' : ''}>100 M</option>
        </select>
      </td>
      <td>
        <input 
          type="number" 
          step="0.5" 
          min="0" 
          max="${maxVal}" 
          class="upload-score-input ${rawVal !== '' ? 'has-value' : ''}" 
          data-student-id="${s.studentId}" 
          data-index="${idx}"
          placeholder="e.g. 19" 
          value="${rawVal}"
        />
      </td>
      <td>
        <span class="upload-scaled-badge ${badgeClass}" id="scaled-desk-${s.studentId}">
          ${scaledVal} / ${targetScale}
        </span>
      </td>
      <td id="status-cell-desk-${s.studentId}">
        ${statusHtml}
      </td>
      <td>
        <button type="button" class="btn btn-secondary btn-sm" onclick="saveSingleUploadMark('${s.studentId}')" title="Save this student">
          💾 Save
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  // Attach event listeners to desktop inputs
  tbody.querySelectorAll('.upload-score-input').forEach(input => {
    input.addEventListener('input', (e) => {
      handleScoreInputChange(e.target.dataset.studentId, e.target.value);
    });

    // Enter key focuses the next student's input!
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIdx = parseInt(input.dataset.index, 10);
        const nextInput = tbody.querySelector(`.upload-score-input[data-index="${currentIdx + 1}"]`);
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIdx = parseInt(input.dataset.index, 10);
        const prevInput = tbody.querySelector(`.upload-score-input[data-index="${currentIdx - 1}"]`);
        if (prevInput) {
          prevInput.focus();
          prevInput.select();
        }
      }
    });
  });

  tbody.querySelectorAll('.upload-max-select').forEach(select => {
    select.addEventListener('change', (e) => {
      handleMaxMarksChange(e.target.dataset.studentId, Number(e.target.value));
    });
  });
}

// Render Mobile Cards View
function renderMobileUploadCards(studentsList) {
  const container = elements.uploadMobileCards;
  container.innerHTML = '';
  const targetScale = getMaxScaledForSubject(state.upload.subject);

  if (studentsList.length === 0) {
    container.innerHTML = `<div style="padding: 2rem; text-align: center; color: #94a3b8;">No students match your search.</div>`;
    return;
  }

  studentsList.forEach((s, idx) => {
    const markData = state.upload.marksMap.get(s.studentId) || {
      rawMarks: '',
      maxMarks: state.upload.globalMax,
      scaledMarks: null,
      status: 'empty'
    };

    const card = document.createElement('div');
    card.className = `student-mobile-card ${markData.status === 'dirty' ? 'modified' : markData.status === 'saved' ? 'saved' : ''}`;
    card.id = `card-mob-${s.studentId}`;
    let groupBadgeClass = 'badge-x';
    if (s.group === 'Group-Y') groupBadgeClass = 'badge-y';
    if (s.group === 'Group-Z') groupBadgeClass = 'badge-z';

    const maxVal = markData.maxMarks || state.upload.globalMax;
    const rawVal = markData.rawMarks !== '' && markData.rawMarks !== null ? markData.rawMarks : '';
    const scaledVal = markData.scaledMarks !== null ? markData.scaledMarks.toFixed(2) : '—';

    let statusHtml = '<span class="status-indicator status-empty">⚪ Empty</span>';
    if (markData.status === 'saved') {
      statusHtml = '<span class="status-indicator status-saved">✅ Saved</span>';
    } else if (markData.status === 'dirty') {
      statusHtml = '<span class="status-indicator status-unsaved">🟡 Unsaved</span>';
    }

    card.innerHTML = `
      <div class="mobile-card-header">
        <div class="mobile-student-identity">
          <span class="mobile-roll-num">#${s.rollNumber}</span>
          <span class="mobile-student-name">${s.name}</span>
        </div>
        <div class="mobile-card-meta">
          <span class="badge ${groupBadgeClass}">${s.group}</span>
          <span class="badge badge-sec-${s.section.toLowerCase()}">Sec ${s.section}</span>
        </div>
      </div>

      <div class="mobile-card-phone">
        📞 ${s.phoneNumber}
      </div>

      <div class="mobile-card-inputs">
        <div class="mobile-input-group">
          <label>Max Marks:</label>
          <select class="mobile-max-select" data-student-id="${s.studentId}">
            <option value="20" ${maxVal == 20 ? 'selected' : ''}>20 Marks</option>
            <option value="25" ${maxVal == 25 ? 'selected' : ''}>25 Marks</option>
            <option value="50" ${maxVal == 50 ? 'selected' : ''}>50 Marks</option>
            <option value="100" ${maxVal == 100 ? 'selected' : ''}>100 Marks</option>
          </select>
        </div>

        <div class="mobile-input-group">
          <label>Marks Scored:</label>
          <input 
            type="number" 
            step="0.5" 
            min="0" 
            max="${maxVal}" 
            inputmode="decimal" 
            class="mobile-score-input" 
            data-student-id="${s.studentId}" 
            data-index="${idx}"
            placeholder="0" 
            value="${rawVal}"
          />
        </div>
      </div>

      <div class="mobile-card-footer">
        <div class="mobile-calc-preview">
          <span class="mobile-calc-label">Scaled to ${targetScale}:</span>
          <strong class="mobile-scaled-val" id="scaled-mob-${s.studentId}">${scaledVal} / ${targetScale}</strong>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div id="status-cell-mob-${s.studentId}">${statusHtml}</div>
          <button type="button" class="btn btn-secondary btn-sm" onclick="saveSingleUploadMark('${s.studentId}')">
            💾
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
  
  // Attach event listeners to mobile inputs
  container.querySelectorAll('.mobile-score-input').forEach(input => {
    input.addEventListener('input', (e) => {
      handleScoreInputChange(e.target.dataset.studentId, e.target.value);
    });

    // Enter key focuses the next mobile student card input
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const currentIdx = parseInt(input.dataset.index, 10);
        const nextInput = container.querySelector(`.mobile-score-input[data-index="${currentIdx + 1}"]`);
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        }
      }
    });
  });

  container.querySelectorAll('.mobile-max-select').forEach(select => {
    select.addEventListener('change', (e) => {
      handleMaxMarksChange(e.target.dataset.studentId, Number(e.target.value));
    });
  });
}

// Handle score input change in real-time
function handleScoreInputChange(studentId, rawValue) {
  const current = state.upload.marksMap.get(studentId) || {
    rawMarks: '',
    maxMarks: state.upload.globalMax,
    scaledMarks: null,
    status: 'empty'
  };

  const max = current.maxMarks || state.upload.globalMax;
  const targetScale = getMaxScaledForSubject(state.upload.subject);

  if (rawValue === '' || isNaN(rawValue)) {
    current.rawMarks = '';
    current.scaledMarks = null;
    current.status = 'empty';
  } else {
    const numRaw = parseFloat(rawValue);
    current.rawMarks = numRaw;

    if (numRaw > max) {
      current.scaledMarks = null;
      current.status = 'error';
    } else {
      current.scaledMarks = Math.round(((numRaw / max) * targetScale) * 100) / 100;
      current.status = 'dirty';
    }
  }

  state.upload.marksMap.set(studentId, current);

  // Sync inputs on both desktop & mobile views
  syncStudentUI(studentId, current);
  updateUploadBatchCounters();
}

// Handle max marks change for single student
function handleMaxMarksChange(studentId, newMax) {
  const current = state.upload.marksMap.get(studentId) || {
    rawMarks: '',
    maxMarks: newMax,
    scaledMarks: null,
    status: 'empty'
  };

  const targetScale = getMaxScaledForSubject(state.upload.subject);
  current.maxMarks = newMax;
  if (current.rawMarks !== '' && !isNaN(current.rawMarks)) {
    const numRaw = Number(current.rawMarks);
    if (numRaw > newMax) {
      current.scaledMarks = null;
      current.status = 'error';
    } else {
      current.scaledMarks = Math.round(((numRaw / newMax) * targetScale) * 100) / 100;
      current.status = 'dirty';
    }
  }

  state.upload.marksMap.set(studentId, current);
  syncStudentUI(studentId, current);
  updateUploadBatchCounters();
}

// Sync UI elements across desktop and mobile for a specific student
function syncStudentUI(studentId, markData) {
  const scaledDesk = document.getElementById(`scaled-desk-${studentId}`);
  const scaledMob = document.getElementById(`scaled-mob-${studentId}`);
  const statusDesk = document.getElementById(`status-cell-desk-${studentId}`);
  const statusMob = document.getElementById(`status-cell-mob-${studentId}`);
  const deskInput = document.querySelector(`.upload-score-input[data-student-id="${studentId}"]`);
  const mobInput = document.querySelector(`.mobile-score-input[data-student-id="${studentId}"]`);
  const deskSelect = document.querySelector(`.upload-max-select[data-student-id="${studentId}"]`);
  const mobSelect = document.querySelector(`.mobile-max-select[data-student-id="${studentId}"]`);
  const mobCard = document.getElementById(`card-mob-${studentId}`);

  // Value syncing
  if (deskInput && deskInput.value != markData.rawMarks) deskInput.value = markData.rawMarks;
  if (mobInput && mobInput.value != markData.rawMarks) mobInput.value = markData.rawMarks;
  if (deskSelect && deskSelect.value != markData.maxMarks) deskSelect.value = markData.maxMarks;
  if (mobSelect && mobSelect.value != markData.maxMarks) mobSelect.value = markData.maxMarks;

  // Scaled display
  const targetScale = getMaxScaledForSubject(state.upload.subject);
  let scaledText = '—';
  let badgeClass = '';
  let mobClass = '';

  if (markData.status === 'error') {
    scaledText = 'Exceeds max!';
    badgeClass = 'low';
  } else if (markData.scaledMarks !== null) {
    scaledText = `${markData.scaledMarks.toFixed(2)} / ${targetScale}`;
    const pct = (markData.scaledMarks / targetScale) * 100;
    if (pct >= 75) badgeClass = 'high';
    else if (pct >= 50) badgeClass = 'medium';
    else badgeClass = 'low';
  }

  if (scaledDesk) {
    scaledDesk.textContent = scaledText;
    scaledDesk.className = `upload-scaled-badge ${badgeClass}`;
  }
  if (scaledMob) {
    scaledMob.textContent = scaledText;
    scaledMob.style.color = badgeClass === 'high' ? '#166534' : badgeClass === 'medium' ? '#b45309' : badgeClass === 'low' ? '#dc2626' : '#64748b';
  }

  // Status HTML
  let statusHtml = '<span class="status-indicator status-empty">⚪ Empty</span>';
  if (markData.status === 'saved') {
    statusHtml = '<span class="status-indicator status-saved">✅ Saved</span>';
  } else if (markData.status === 'dirty') {
    statusHtml = '<span class="status-indicator status-unsaved">🟡 Unsaved</span>';
  } else if (markData.status === 'error') {
    statusHtml = '<span class="status-indicator" style="background:#fee2e2; color:#dc2626;">❌ Invalid</span>';
  }

  if (statusDesk) statusDesk.innerHTML = statusHtml;
  if (statusMob) statusMob.innerHTML = statusHtml;

  // Input styling
  if (deskInput) {
    deskInput.classList.toggle('has-value', markData.rawMarks !== '');
    deskInput.classList.toggle('error', markData.status === 'error');
  }
  if (mobInput) {
    mobInput.classList.toggle('error', markData.status === 'error');
  }
  if (mobCard) {
    mobCard.classList.toggle('modified', markData.status === 'dirty');
    mobCard.classList.toggle('saved', markData.status === 'saved');
  }
}

// Update counters
function updateUploadBatchCounters() {
  let enteredCount = 0;
  state.upload.marksMap.forEach(m => {
    if (m.rawMarks !== '' && m.rawMarks !== null && !isNaN(m.rawMarks)) {
      enteredCount++;
    }
  });

  const totalInGroup = state.students.filter(s => state.upload.group === 'all' || s.group === state.upload.group).length;

  if (elements.uploadEnteredBadge) {
    elements.uploadEnteredBadge.textContent = `${enteredCount} / ${totalInGroup} Entered`;
  }
  if (elements.uploadPendingCount) {
    elements.uploadPendingCount.textContent = enteredCount;
  }
  if (elements.mobileSaveCountText) {
    elements.mobileSaveCountText.textContent = `${enteredCount} / ${totalInGroup} Filled`;
  }
}

// Save All Entered Marks in Batch (Bulk Upload)
async function saveAllUploadMarks() {
  const testName = state.upload.testName;
  const subject = state.upload.subject;
  const targetScale = getMaxScaledForSubject(subject);

  // Capture any values typed into desktop score inputs
  document.querySelectorAll('.upload-score-input').forEach(input => {
    const sId = input.dataset.studentId;
    const val = input.value !== undefined ? String(input.value).trim() : '';
    if (val !== '' && !isNaN(val)) {
      const select = document.querySelector(`.upload-max-select[data-student-id="${sId}"]`);
      const max = select ? Number(select.value) : state.upload.globalMax;
      const numRaw = Number(val);
      const current = state.upload.marksMap.get(sId) || { rawMarks: '', maxMarks: max, scaledMarks: null, status: 'empty' };
      current.rawMarks = numRaw;
      current.maxMarks = max;
      if (numRaw <= max) {
        current.scaledMarks = Math.round(((numRaw / max) * targetScale) * 100) / 100;
        if (current.status !== 'saved') current.status = 'dirty';
      } else {
        current.status = 'error';
      }
      state.upload.marksMap.set(sId, current);
    }
  });

  // Also capture any values typed into mobile score inputs
  document.querySelectorAll('.mobile-score-input').forEach(input => {
    const sId = input.dataset.studentId;
    const val = input.value !== undefined ? String(input.value).trim() : '';
    if (val !== '' && !isNaN(val)) {
      const select = document.querySelector(`.mobile-max-select[data-student-id="${sId}"]`);
      const max = select ? Number(select.value) : state.upload.globalMax;
      const numRaw = Number(val);
      const current = state.upload.marksMap.get(sId) || { rawMarks: '', maxMarks: max, scaledMarks: null, status: 'empty' };
      current.rawMarks = numRaw;
      current.maxMarks = max;
      if (numRaw <= max) {
        current.scaledMarks = Math.round(((numRaw / max) * targetScale) * 100) / 100;
        if (current.status !== 'saved') current.status = 'dirty';
      } else {
        current.status = 'error';
      }
      state.upload.marksMap.set(sId, current);
    }
  });

  // Gather marks to save
  const marksToSave = [];
  const invalidStudents = [];

  state.upload.marksMap.forEach((m, studentId) => {
    if (m.rawMarks !== '' && m.rawMarks !== null && !isNaN(m.rawMarks)) {
      const numRaw = Number(m.rawMarks);
      const numMax = Number(m.maxMarks);

      if (numRaw > numMax) {
        invalidStudents.push(`${studentId} (${numRaw} > ${numMax})`);
      } else {
        marksToSave.push({
          studentId,
          rawMarks: numRaw,
          maxMarks: numMax
        });
      }
    }
  });

  if (invalidStudents.length > 0) {
    showToast(`Error: Scores exceed max marks for: ${invalidStudents.join(', ')}`, 'error');
    return;
  }

  if (marksToSave.length === 0) {
    showToast('Please enter marks for at least one student before saving.', 'error');
    return;
  }

  try {
    const saveBtn = elements.saveAllUploadBtn;
    const mobBtn = elements.mobileSaveAllBtn;
    if (saveBtn) { saveBtn.disabled = true; saveBtn.innerHTML = '⏳ Saving...'; }
    if (mobBtn) { mobBtn.disabled = true; mobBtn.innerHTML = '⏳ Saving...'; }

    const res = await fetch('/api/marks/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testName,
        subject,
        marks: marksToSave
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to upload marks');

    // Update state to 'saved'
    marksToSave.forEach(m => {
      const current = state.upload.marksMap.get(m.studentId);
      if (current) {
        current.status = 'saved';
        syncStudentUI(m.studentId, current);
      }
    });

    showToast(`✅ Successfully uploaded ${data.savedCount} marks for ${subject} (${testName})!`, 'success');

    // Refresh background views
    loadRankings();
    loadManageMarks();

  } catch (err) {
    showToast('Upload error: ' + err.message, 'error');
  } finally {
    if (elements.saveAllUploadBtn) {
      elements.saveAllUploadBtn.disabled = false;
      elements.saveAllUploadBtn.innerHTML = `💾 Save All Marks (<span id="upload-pending-count">${marksToSave.length}</span>)`;
    }
    if (elements.mobileSaveAllBtn) {
      elements.mobileSaveAllBtn.disabled = false;
      elements.mobileSaveAllBtn.innerHTML = '💾 Save All Marks';
    }
  }
}

// Save Single Student Mark from Upload Page
window.saveSingleUploadMark = async function(studentId) {
  const current = state.upload.marksMap.get(studentId);
  if (!current || current.rawMarks === '' || isNaN(current.rawMarks)) {
    showToast(`Please enter scored marks for ${studentId}`, 'error');
    return;
  }

  const rawMarks = Number(current.rawMarks);
  const maxMarks = Number(current.maxMarks);

  if (rawMarks > maxMarks) {
    showToast(`Marks scored (${rawMarks}) cannot exceed max marks (${maxMarks})`, 'error');
    return;
  }

  try {
    const res = await fetch('/api/marks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId,
        testName: state.upload.testName,
        subject: state.upload.subject,
        maxMarks,
        rawMarks
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to save');

    current.status = 'saved';
    current.scaledMarks = data.record.scaledMarks;
    syncStudentUI(studentId, current);

    const targetScale = getMaxScaledForSubject(state.upload.subject);
    showToast(`✅ Saved ${studentId}: ${rawMarks}/${maxMarks} (${data.record.scaledMarks}/${targetScale})`, 'success');

    // Refresh background
    loadRankings();
    loadManageMarks();
  } catch (err) {
    showToast('Save error: ' + err.message, 'error');
  }
};

// ================= TAB 2: RANKINGS & EXCEL EXPORT =================
function setupRankingsControls() {
  // Test Selector
  elements.rankingsTestSelect.addEventListener('change', () => {
    state.currentTest = elements.rankingsTestSelect.value;
    loadRankings();
  });

  // 4 Ways Tabs
  elements.rankTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.rankTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentGroupFilter = btn.getAttribute('data-group');
      loadRankings();
    });
  });

  // Search input
  elements.rankSearchInput.addEventListener('input', () => {
    state.rankSearchQuery = elements.rankSearchInput.value.toLowerCase().trim();
    renderRankingsTable();
  });

  // Sort order selector
  elements.rankSortSelect.addEventListener('change', () => {
    state.activeSort = elements.rankSortSelect.value;
    renderRankingsTable();
  });

  // Excel Download Button (Current View)
  elements.downloadExcelBtn.addEventListener('click', exportRankingsToExcel);

  // Consolidated Excel Download Button (All Groups Single File)
  if (elements.downloadAllGroupsExcelBtn) {
    elements.downloadAllGroupsExcelBtn.addEventListener('click', () => {
      exportAllGroupsRankingsToExcel();
    });
  }
}

async function loadRankings() {
  try {
    const testName = elements.rankingsTestSelect.value || 'Test-1';
    const group = state.currentGroupFilter;

    const res = await fetch(`/api/rankings?testName=${encodeURIComponent(testName)}&group=${encodeURIComponent(group)}`);
    const data = await res.json();
    state.rankingsData = data.rankings || [];

    renderRankingsTable();
  } catch (err) {
    showToast('Failed to load rankings: ' + err.message, 'error');
  }
}

function renderRankingsTable() {
  let list = [...state.rankingsData];

  // Filter by search query
  if (state.rankSearchQuery) {
    const tokens = state.rankSearchQuery.split(/\s+/);
    list = list.filter(item => {
      const searchTarget = `${item.name} ${item.studentId} ${item.group} ${item.section} ${item.phoneNumber}`.toLowerCase();
      return tokens.every(t => searchTarget.includes(t));
    });
  }

  // Sorting
  if (state.activeSort === 'rank-asc') {
    list.sort((a, b) => a.rank - b.rank);
  } else if (state.activeSort === 'rank-desc') {
    list.sort((a, b) => b.rank - a.rank);
  } else if (state.activeSort === 'name-asc') {
    list.sort((a, b) => a.studentId.localeCompare(b.studentId, undefined, { numeric: true }));
  } else if (state.activeSort === 'name-desc') {
    list.sort((a, b) => b.studentId.localeCompare(a.studentId, undefined, { numeric: true }));
  }

  elements.rankingsResultsCount.textContent = `Showing ${list.length} students`;

  if (list.length === 0) {
    elements.rankingsTableBody.innerHTML = `
      <tr>
        <td colspan="15" style="text-align: center; padding: 2.5rem; color: #94a3b8;">
          No student records found matching the criteria.
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  list.forEach(student => {
    let rankBadgeClass = 'rank-other';
    let rankDisplay = `#${student.rank}`;
    if (student.rank === 1) { rankBadgeClass = 'rank-1'; rankDisplay = '🥇 1'; }
    else if (student.rank === 2) { rankBadgeClass = 'rank-2'; rankDisplay = '🥈 2'; }
    else if (student.rank === 3) { rankBadgeClass = 'rank-3'; rankDisplay = '🥉 3'; }

    let groupClass = 'badge-x';
    if (student.group === 'Group-Y') groupClass = 'badge-y';
    if (student.group === 'Group-Z') groupClass = 'badge-z';

    // 7 Subject Marks
    const getSubScoreCell = (subName) => {
      const s = student.subjectScores[subName];
      if (s && s.hasScore) {
        return `<td class="sub-mark-cell">${s.scaledMarks}</td>`;
      }
      return `<td class="sub-mark-cell empty">—</td>`;
    };

    html += `
      <tr>
        <td class="td-rank">
          <span class="rank-badge ${rankBadgeClass}">${rankDisplay}</span>
        </td>
        <td><strong>${student.name}</strong></td>
        <td><span class="badge ${groupClass}">${student.group}</span></td>
        <td><span class="badge badge-sec-${student.section.toLowerCase()}">Sec ${student.section}</span></td>
        <td class="phone-cell">📞 ${student.phoneNumber}</td>
        ${getSubScoreCell('Telugu')}
        ${getSubScoreCell('Hindi')}
        ${getSubScoreCell('English')}
        ${getSubScoreCell('Maths')}
        ${getSubScoreCell('Physics')}
        ${getSubScoreCell('Biology')}
        ${getSubScoreCell('Social')}
        <td class="td-total">${student.totalMarks.toFixed(2)}</td>
        <td class="td-percent">${student.percentage}%</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="quickEnterMarks('${student.studentId}')" title="Enter Marks">
            ✏️ Enter
          </button>
        </td>
      </tr>
    `;
  });

  elements.rankingsTableBody.innerHTML = html;
}

// Quick enter marks from ranking table
window.quickEnterMarks = function(studentId) {
  const student = state.students.find(s => s.studentId === studentId);
  if (student) {
    // Switch to Enter Marks tab
    document.querySelector('.nav-btn[data-tab="tab-enter-marks"]').click();
    selectStudent(student);
    elements.rawMarksInput.focus();
  }
};

// ================= EXCEL EXPORT (USING SHEETJS) =================
function exportRankingsToExcel() {
  if (typeof XLSX === 'undefined') {
    showToast('Excel export library is loading, please try again.', 'error');
    return;
  }

  const testName = elements.rankingsTestSelect.value || 'Test-1';
  let groupTitle = 'All Students (Groups X, Y, Z)';
  if (state.currentGroupFilter === 'Group-X') groupTitle = 'Group-X Students (11 Students)';
  else if (state.currentGroupFilter === 'Group-Y') groupTitle = 'Group-Y Students (18 Students)';
  else if (state.currentGroupFilter === 'Group-Z') groupTitle = 'Group-Z Students (40 Students)';

  // Build 2D Array for Excel
  const excelData = [
    ['ZPHS MLPL HIGH SCHOOL'],
    [`ACADEMIC EVALUATION & RANKINGS REPORT - ${testName.toUpperCase()}`],
    [`Group View: ${groupTitle}`, `Generated On: ${new Date().toLocaleString()}`],
    [], // Blank separator row
    [
      'Rank',
      'Student ID / Name',
      'Group',
      'Section',
      'Phone Number',
      'Telugu (/100)',
      'Hindi (/100)',
      'English (/100)',
      'Maths (/100)',
      'Physics (/50)',
      'Biology (/50)',
      'Social (/100)',
      'Total Marks (/600)',
      'Percentage (%)',
      'Grade Status'
    ]
  ];

  // Sort list for export (top marks first)
  const sortedForExport = [...state.rankingsData].sort((a, b) => a.rank - b.rank);

  sortedForExport.forEach(item => {
    let grade = 'A+';
    if (item.percentage >= 90) grade = 'A+ (Outstanding)';
    else if (item.percentage >= 75) grade = 'A (Distinction)';
    else if (item.percentage >= 60) grade = 'B (First Class)';
    else if (item.percentage >= 50) grade = 'C (Second Class)';
    else grade = 'D (Needs Improvement)';

    excelData.push([
      item.rank,
      item.name,
      item.group,
      `Section ${item.section}`,
      item.phoneNumber,
      item.subjectScores['Telugu']?.hasScore ? item.subjectScores['Telugu'].scaledMarks : 0,
      item.subjectScores['Hindi']?.hasScore ? item.subjectScores['Hindi'].scaledMarks : 0,
      item.subjectScores['English']?.hasScore ? item.subjectScores['English'].scaledMarks : 0,
      item.subjectScores['Maths']?.hasScore ? item.subjectScores['Maths'].scaledMarks : 0,
      item.subjectScores['Physics']?.hasScore ? item.subjectScores['Physics'].scaledMarks : 0,
      item.subjectScores['Biology']?.hasScore ? item.subjectScores['Biology'].scaledMarks : 0,
      item.subjectScores['Social']?.hasScore ? item.subjectScores['Social'].scaledMarks : 0,
      item.totalMarks,
      `${item.percentage}%`,
      grade
    ]);
  });

  // Create Workbook
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(excelData);

  // Set column widths
  ws['!cols'] = [
    { wch: 8 },  // Rank
    { wch: 18 }, // Student Name
    { wch: 12 }, // Group
    { wch: 12 }, // Section
    { wch: 16 }, // Phone Number
    { wch: 14 }, // Telugu
    { wch: 14 }, // Hindi
    { wch: 14 }, // English
    { wch: 14 }, // Maths
    { wch: 14 }, // Physics
    { wch: 14 }, // Biology
    { wch: 14 }, // Social
    { wch: 18 }, // Total
    { wch: 15 }, // Percentage
    { wch: 20 }  // Grade
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Rankings');

  const filename = `ZPHS_${testName}_${state.currentGroupFilter}_Rankings.xlsx`;
  XLSX.writeFile(wb, filename);

  showToast(`📊 Downloaded: ${filename}`, 'success');
}

// ================= CONSOLIDATED ALL GROUPS EXCEL EXPORT (SINGLE FILE) =================
async function exportAllGroupsRankingsToExcel() {
  if (typeof XLSX === 'undefined') {
    showToast('Excel export library is loading, please try again.', 'error');
    return;
  }

  const testName = elements.rankingsTestSelect.value || 'Test-1';
  showToast(`Generating consolidated all-groups rankings for ${testName}...`, 'info');

  try {
    // Fetch all students (Groups X, Y, Z combined)
    const res = await fetch(`/api/rankings?testName=${encodeURIComponent(testName)}&group=all`);
    const data = await res.json();
    const allStudents = data.rankings || [];

    if (allStudents.length === 0) {
      showToast('No student ranking data found for ' + testName, 'error');
      return;
    }

    // Split and sort group-wise by their group rank
    const groupX = allStudents.filter(s => s.group === 'Group-X').sort((a, b) => a.groupRank - b.groupRank);
    const groupY = allStudents.filter(s => s.group === 'Group-Y').sort((a, b) => a.groupRank - b.groupRank);
    const groupZ = allStudents.filter(s => s.group === 'Group-Z').sort((a, b) => a.groupRank - b.groupRank);

    // Helper to format a student data row
    function formatStudentRow(item, isGroupSpecific = true) {
      let grade = 'A+ (Outstanding)';
      if (item.percentage >= 90) grade = 'A+ (Outstanding)';
      else if (item.percentage >= 75) grade = 'A (Distinction)';
      else if (item.percentage >= 60) grade = 'B (First Class)';
      else if (item.percentage >= 50) grade = 'C (Second Class)';
      else grade = 'D (Needs Improvement)';

      return [
        isGroupSpecific ? item.groupRank : item.rank,
        isGroupSpecific ? item.rank : item.groupRank,
        item.rollNumber || '—',
        item.name,
        item.studentId,
        item.group,
        `Section ${item.section}`,
        item.phoneNumber,
        item.subjectScores['Telugu']?.hasScore ? item.subjectScores['Telugu'].scaledMarks : 0,
        item.subjectScores['Hindi']?.hasScore ? item.subjectScores['Hindi'].scaledMarks : 0,
        item.subjectScores['English']?.hasScore ? item.subjectScores['English'].scaledMarks : 0,
        item.subjectScores['Maths']?.hasScore ? item.subjectScores['Maths'].scaledMarks : 0,
        item.subjectScores['Physics']?.hasScore ? item.subjectScores['Physics'].scaledMarks : 0,
        item.subjectScores['Biology']?.hasScore ? item.subjectScores['Biology'].scaledMarks : 0,
        item.subjectScores['Social']?.hasScore ? item.subjectScores['Social'].scaledMarks : 0,
        item.totalMarks,
        `${item.percentage}%`,
        grade
      ];
    }

    const columnHeaders = [
      'Group Rank',
      'School Rank',
      'Roll No',
      'Student Name',
      'Student ID',
      'Academic Group',
      'Section',
      'Parent Phone Number',
      'Telugu (/100)',
      'Hindi (/100)',
      'English (/100)',
      'Maths (/100)',
      'Physics (/50)',
      'Biology (/50)',
      'Social (/100)',
      'Total Marks (/600)',
      'Percentage (%)',
      'Grade / Remarks'
    ];

    const colWidths = [
      { wch: 12 }, // Group Rank
      { wch: 12 }, // School Rank
      { wch: 10 }, // Roll No
      { wch: 28 }, // Name
      { wch: 12 }, // Student ID
      { wch: 14 }, // Group
      { wch: 12 }, // Section
      { wch: 18 }, // Phone
      { wch: 14 }, // Telugu
      { wch: 14 }, // Hindi
      { wch: 14 }, // English
      { wch: 14 }, // Maths
      { wch: 14 }, // Physics
      { wch: 14 }, // Biology
      { wch: 14 }, // Social
      { wch: 18 }, // Total
      { wch: 15 }, // Percentage
      { wch: 22 }  // Grade
    ];

    // Build workbook
    const wb = XLSX.utils.book_new();

    // -------------------------------------------------------------
    // SHEET 1: Master Sheet with all students sorted by group rank:
    // Ranked order of Group-X, Space, Ranked order of Group-Y, Space, Ranked order of Group-Z
    // -------------------------------------------------------------
    const masterRows = [
      ['ZILLA PARISHAD HIGH SCHOOL (ZPHS MLPL)'],
      [`ALL GROUPS ACADEMIC EVALUATION & RANKINGS REPORT — ${testName.toUpperCase()}`],
      [`All Students Group-Wise Ranked (Group-X, Group-Y, Group-Z) | Maximum Marks: 600`, `Generated On: ${new Date().toLocaleString()}`],
      [], // blank row
    ];

    // 1. Group-X Section
    masterRows.push([`=== GROUP-X STUDENTS (SORTED BY GROUP RANK: 1 TO ${groupX.length}) ===`]);
    masterRows.push(columnHeaders);
    groupX.forEach(s => masterRows.push(formatStudentRow(s, true)));

    // Blank separator space between Group-X and Group-Y
    masterRows.push([]);
    masterRows.push([]);

    // 2. Group-Y Section
    masterRows.push([`=== GROUP-Y STUDENTS (SORTED BY GROUP RANK: 1 TO ${groupY.length}) ===`]);
    masterRows.push(columnHeaders);
    groupY.forEach(s => masterRows.push(formatStudentRow(s, true)));

    // Blank separator space between Group-Y and Group-Z
    masterRows.push([]);
    masterRows.push([]);

    // 3. Group-Z Section
    masterRows.push([`=== GROUP-Z STUDENTS (SORTED BY GROUP RANK: 1 TO ${groupZ.length}) ===`]);
    masterRows.push(columnHeaders);
    groupZ.forEach(s => masterRows.push(formatStudentRow(s, true)));

    const wsMaster = XLSX.utils.aoa_to_sheet(masterRows);
    wsMaster['!cols'] = colWidths;
    XLSX.utils.book_append_sheet(wb, wsMaster, 'All Groups (Group-Wise)');

    // -------------------------------------------------------------
    // Additional Individual Tabs for each Group
    // -------------------------------------------------------------
    function buildSingleGroupSheet(groupList, groupName) {
      const gRows = [
        ['ZILLA PARISHAD HIGH SCHOOL (ZPHS MLPL)'],
        [`${groupName.toUpperCase()} RANKINGS REPORT — ${testName.toUpperCase()}`],
        [`Total Students: ${groupList.length} | Maximum Total: 600 Marks`, `Generated On: ${new Date().toLocaleString()}`],
        [],
        columnHeaders
      ];
      groupList.forEach(s => gRows.push(formatStudentRow(s, true)));
      const ws = XLSX.utils.aoa_to_sheet(gRows);
      ws['!cols'] = colWidths;
      return ws;
    }

    if (groupX.length > 0) {
      XLSX.utils.book_append_sheet(wb, buildSingleGroupSheet(groupX, 'Group-X'), 'Group-X Ranked');
    }
    if (groupY.length > 0) {
      XLSX.utils.book_append_sheet(wb, buildSingleGroupSheet(groupY, 'Group-Y'), 'Group-Y Ranked');
    }
    if (groupZ.length > 0) {
      XLSX.utils.book_append_sheet(wb, buildSingleGroupSheet(groupZ, 'Group-Z'), 'Group-Z Ranked');
    }

    // Sheet 5: Overall school rank (1 to 69)
    const masterOverall = [...allStudents].sort((a, b) => a.rank - b.rank);
    const overallHeaders = [
      'School Rank',
      'Group Rank',
      'Roll No',
      'Student Name',
      'Student ID',
      'Academic Group',
      'Section',
      'Parent Phone Number',
      'Telugu (/100)',
      'Hindi (/100)',
      'English (/100)',
      'Maths (/100)',
      'Physics (/50)',
      'Biology (/50)',
      'Social (/100)',
      'Total Marks (/600)',
      'Percentage (%)',
      'Grade / Remarks'
    ];
    const overallRows = [
      ['ZILLA PARISHAD HIGH SCHOOL (ZPHS MLPL)'],
      [`ALL STUDENTS COMBINED (OVERALL SCHOOL RANK) — ${testName.toUpperCase()}`],
      [`Total Students: ${allStudents.length} | Maximum Marks: 600`, `Generated On: ${new Date().toLocaleString()}`],
      [],
      overallHeaders
    ];
    masterOverall.forEach(s => overallRows.push(formatStudentRow(s, false)));
    const wsOverall = XLSX.utils.aoa_to_sheet(overallRows);
    wsOverall['!cols'] = colWidths;
    XLSX.utils.book_append_sheet(wb, wsOverall, 'Overall School Ranked');

    const filename = `ZPHS_${testName}_All_Groups_Ranked_GroupWise.xlsx`;
    XLSX.writeFile(wb, filename);
    showToast(`📑 Downloaded: ${filename} (Group-X, Group-Y, Group-Z ranked order)`, 'success');

  } catch (err) {
    console.error('Error exporting all groups rankings:', err);
    showToast('Failed to export all groups Excel: ' + err.message, 'error');
  }
}

// ================= PARENT / STUDENT PROGRESS PORTAL =================
function setupParentPortalControls() {
  if (!elements.parentStudentSelect) return;

  // 1. Dropdown selection change
  elements.parentStudentSelect.addEventListener('change', (e) => {
    const sId = e.target.value;
    selectParentStudent(sId);
  });

  // 2. Search input autocomplete
  if (elements.parentStudentSearch) {
    elements.parentStudentSearch.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      state.parentPortal.searchQuery = q;
      renderParentSearchDropdown(q);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!elements.parentStudentSearch.contains(e.target) && !elements.parentSearchResults.contains(e.target)) {
        elements.parentSearchResults.classList.add('hidden');
      }
    });

    elements.parentStudentSearch.addEventListener('focus', () => {
      const q = elements.parentStudentSearch.value.trim().toLowerCase();
      renderParentSearchDropdown(q);
    });
  }

  // 3. Quick Group Filter Buttons
  elements.parentGrpFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.parentGrpFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.parentPortal.groupFilter = btn.dataset.group;
      populateParentStudentDropdown(btn.dataset.group);
      if (elements.parentStudentSearch && elements.parentStudentSearch.value) {
        renderParentSearchDropdown(elements.parentStudentSearch.value.trim().toLowerCase());
      }
    });
  });

  // 4. Toggle Show All 30 Tests vs Conducted Only
  if (elements.parentToggleAllTests) {
    elements.parentToggleAllTests.addEventListener('change', (e) => {
      state.parentPortal.showConductedOnly = !e.target.checked;
      if (elements.toggleTestsLabel) {
        elements.toggleTestsLabel.textContent = e.target.checked ? 'Showing All 30 Tests' : 'Show Conducted Tests Only';
      }
      if (state.parentPortal.reportData) {
        renderParentTestsTable(state.parentPortal.reportData.testReports);
      }
    });
  }

  // 5. Action Buttons
  if (elements.parentPrintReportBtn) {
    elements.parentPrintReportBtn.addEventListener('click', printParentReport);
  }

  if (elements.parentDownloadExcelBtn) {
    elements.parentDownloadExcelBtn.addEventListener('click', () => {
      if (state.parentPortal.selectedStudentId) {
        exportStudentReportToExcel(state.parentPortal.selectedStudentId);
      }
    });
  }

  if (elements.parentWhatsappBtn) {
    elements.parentWhatsappBtn.addEventListener('click', copyParentWhatsAppSummary);
  }
}

// Populate Parent Student Dropdown with Optgroups
function populateParentStudentDropdown(filterGroup = 'all') {
  const select = elements.parentStudentSelect;
  if (!select) return;

  const currentVal = select.value;
  select.innerHTML = '<option value="">-- Choose a Student --</option>';

  const groups = [
    { key: 'Group-X', label: 'Group-X (11 Students)' },
    { key: 'Group-Y', label: 'Group-Y (18 Students)' },
    { key: 'Group-Z', label: 'Group-Z (40 Students)' }
  ];

  groups.forEach(g => {
    if (filterGroup === 'all' || filterGroup === g.key) {
      const optgroup = document.createElement('optgroup');
      optgroup.label = g.label;
      const filtered = state.students.filter(s => s.group === g.key);
      filtered.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.studentId;
        opt.textContent = `#${s.rollNumber} - ${s.name} (${s.studentId}, Sec ${s.section}) - ${s.phoneNumber}`;
        if (s.studentId === currentVal) opt.selected = true;
        optgroup.appendChild(opt);
      });
      select.appendChild(optgroup);
    }
  });
}

// Render search dropdown suggestions
function renderParentSearchDropdown(query) {
  const container = elements.parentSearchResults;
  if (!container) return;

  let list = [...state.students];
  if (state.parentPortal.groupFilter !== 'all') {
    list = list.filter(s => s.group === state.parentPortal.groupFilter);
  }

  if (query) {
    const tokens = query.split(/\s+/);
    list = list.filter(s => {
      const full = `${s.name} ${s.studentId} ${s.rollNumber} ${s.group} ${s.section} ${s.phoneNumber}`.toLowerCase();
      return tokens.every(t => full.includes(t));
    });
  }

  if (list.length === 0) {
    container.innerHTML = `<div style="padding: 0.75rem; text-align: center; color: #94a3b8; font-size: 0.85rem;">No matching students found.</div>`;
    container.classList.remove('hidden');
    return;
  }

  container.innerHTML = '';
  list.slice(0, 15).forEach(s => {
    const item = document.createElement('div');
    item.className = 'search-dropdown-item';
    item.innerHTML = `
      <div>
        <strong>${s.name}</strong>
        <span style="display: block; font-size: 0.75rem; color: #64748b;">Roll #${s.rollNumber} | ${s.studentId} | Sec ${s.section}</span>
      </div>
      <div style="text-align: right;">
        <span class="badge ${s.group === 'Group-X' ? 'badge-x' : s.group === 'Group-Y' ? 'badge-y' : 'badge-z'}">${s.group}</span>
        <span style="display: block; font-size: 0.75rem; color: #64748b; margin-top: 2px;">📞 ${s.phoneNumber}</span>
      </div>
    `;
    item.addEventListener('click', () => {
      elements.parentStudentSearch.value = `${s.name} (${s.studentId})`;
      container.classList.add('hidden');
      selectParentStudent(s.studentId);
    });
    container.appendChild(item);
  });

  container.classList.remove('hidden');
}

// Select student and load their parent report
async function selectParentStudent(studentId) {
  if (!studentId) {
    state.parentPortal.selectedStudentId = '';
    state.parentPortal.reportData = null;
    elements.parentReportContainer.classList.add('hidden');
    elements.parentEmptyState.classList.remove('hidden');
    if (elements.parentPrintReportBtn) elements.parentPrintReportBtn.disabled = true;
    if (elements.parentDownloadExcelBtn) elements.parentDownloadExcelBtn.disabled = true;
    if (elements.parentWhatsappBtn) elements.parentWhatsappBtn.disabled = true;
    return;
  }

  state.parentPortal.selectedStudentId = studentId;
  if (elements.parentStudentSelect && elements.parentStudentSelect.value !== studentId) {
    elements.parentStudentSelect.value = studentId;
  }

  await loadParentReport(studentId);
}

// Fetch complete report from API and render
async function loadParentReport(studentId) {
  try {
    const res = await fetch(`/api/students/${encodeURIComponent(studentId)}/report`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to load student report card');
    }

    state.parentPortal.reportData = data;
    const { student, summary, subjectAverages, testReports } = data;

    // 1. Populate Student Header Details
    elements.parentStudentName.textContent = student.name;
    elements.parentStudentId.textContent = student.studentId;
    elements.parentRollNumber.textContent = `#${student.rollNumber}`;
    elements.parentPhoneNumber.textContent = `📞 ${student.phoneNumber}`;

    elements.parentGroupBadge.textContent = student.group;
    elements.parentGroupBadge.className = `badge ${student.group === 'Group-X' ? 'badge-x' : student.group === 'Group-Y' ? 'badge-y' : 'badge-z'}`;

    elements.parentSectionBadge.textContent = `Sec ${student.section}`;
    elements.parentSectionBadge.className = `badge badge-sec-${student.section.toLowerCase()}`;

    // 2. Populate KPI Cards
    elements.kpiTestsAttempted.textContent = `${summary.testsAttempted} / ${summary.totalTests}`;
    elements.kpiCumulativeAvg.textContent = `${summary.cumulativeAverage.toFixed(1)}%`;
    elements.kpiBestTest.textContent = summary.bestTest;
    elements.kpiBestSub.textContent = summary.bestSubject;
    elements.kpiWeakSub.textContent = summary.weakestSubject;

    // 3. Populate 7 Subject Average Bars
    renderParentSubjectBars(subjectAverages);

    // 4. Populate All Tests Performance Table
    renderParentTestsTable(testReports);

    // 5. Populate Printable Official Template
    renderPrintableReport(student, summary, testReports);

    // Enable Actions
    if (elements.parentPrintReportBtn) elements.parentPrintReportBtn.disabled = false;
    if (elements.parentDownloadExcelBtn) elements.parentDownloadExcelBtn.disabled = false;
    if (elements.parentWhatsappBtn) elements.parentWhatsappBtn.disabled = false;

    // Reveal container
    elements.parentEmptyState.classList.add('hidden');
    elements.parentReportContainer.classList.remove('hidden');

  } catch (err) {
    console.error('Error loading parent report:', err);
    showToast('Failed to load report: ' + err.message, 'error');
  }
}

// Render 7 Subject Averages Bar Cards
function renderParentSubjectBars(subjectAverages) {
  const container = elements.parentSubjectBars;
  if (!container) return;

  container.innerHTML = '';
  state.subjects.forEach(sub => {
    const avg = subjectAverages[sub] || 0;
    let badgeClass = 'low';
    if (avg >= 75) badgeClass = 'high';
    else if (avg >= 50) badgeClass = 'medium';

    const item = document.createElement('div');
    item.className = 'subject-bar-item';
    item.innerHTML = `
      <span class="sub-bar-title">${sub}</span>
      <span class="sub-bar-val">${avg.toFixed(1)}%</span>
      <div class="sub-bar-track">
        <div class="sub-bar-fill ${badgeClass}" style="width: ${Math.min(100, Math.max(0, avg))}%"></div>
      </div>
    `;
    container.appendChild(item);
  });
}

// Render All Tests Table (Conducted vs All 30)
function renderParentTestsTable(testReports) {
  const tbody = elements.parentReportTableBody;
  if (!tbody) return;

  tbody.innerHTML = '';
  const showOnlyConducted = state.parentPortal.showConductedOnly;
  const filteredReports = showOnlyConducted ? testReports.filter(t => t.hasData) : testReports;

  if (filteredReports.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="12" style="text-align: center; padding: 2.5rem; color: #94a3b8;">
          No tests have been conducted yet for this student. Toggle "Show Conducted Tests Only" to view all scheduled tests.
        </td>
      </tr>
    `;
    return;
  }

  filteredReports.forEach(t => {
    const tr = document.createElement('tr');

    // Helper for subject cell
    function renderSubCell(subName) {
      const scoreObj = t.subjectScores[subName];
      if (!t.hasData || !scoreObj || !scoreObj.hasScore) {
        return `<td style="color: #94a3b8; font-family: var(--font-mono);">—</td>`;
      }
      const scaled = scoreObj.scaledMarks;
      let col = '#dc2626';
      if (scaled >= 75) col = '#15803d';
      else if (scaled >= 50) col = '#b45309';

      return `
        <td>
          <span class="mark-cell-badge" style="color: ${col};">
            ${scaled.toFixed(1)}
          </span>
          <span style="font-size: 0.72rem; color: #94a3b8; display: block;">(${scoreObj.rawMarks}/${scoreObj.maxMarks})</span>
        </td>
      `;
    }

    // Rank pill helpers
    let groupRankHtml = `<span style="color: #94a3b8;">—</span>`;
    let overallRankHtml = `<span style="color: #94a3b8;">—</span>`;
    let gradeHtml = `<span class="grade-pill grade-none">—</span>`;

    if (t.hasData) {
      // Group Rank
      let grpPillClass = 'rank-pill-default';
      if (t.groupRank === 1) grpPillClass = 'rank-pill-gold';
      else if (t.groupRank === 2) grpPillClass = 'rank-pill-silver';
      else if (t.groupRank === 3) grpPillClass = 'rank-pill-bronze';
      groupRankHtml = `<span class="rank-badge-pill ${grpPillClass}">#${t.groupRank} / ${t.totalInGroupInTest}</span>`;

      // Overall Rank
      let ovrPillClass = 'rank-pill-default';
      if (t.overallRank === 1) ovrPillClass = 'rank-pill-gold';
      else if (t.overallRank === 2) ovrPillClass = 'rank-pill-silver';
      else if (t.overallRank === 3) ovrPillClass = 'rank-pill-bronze';
      overallRankHtml = `<span class="rank-badge-pill ${ovrPillClass}">#${t.overallRank} / ${t.totalStudentsInTest}</span>`;

      // Grade Pill
      let gClass = 'grade-d';
      if (t.percentage >= 90) gClass = 'grade-a-plus';
      else if (t.percentage >= 75) gClass = 'grade-a';
      else if (t.percentage >= 60) gClass = 'grade-b';
      else if (t.percentage >= 50) gClass = 'grade-c';
      gradeHtml = `<span class="grade-pill ${gClass}">${t.grade}</span>`;
    }

    tr.innerHTML = `
      <td><strong>${t.testName}</strong></td>
      ${renderSubCell('Telugu')}
      ${renderSubCell('Hindi')}
      ${renderSubCell('English')}
      ${renderSubCell('Maths')}
      ${renderSubCell('Physics')}
      ${renderSubCell('Biology')}
      ${renderSubCell('Social')}
      <td class="td-total"><strong>${t.hasData ? t.totalMarks : '—'}</strong></td>
      <td class="td-percent"><strong>${t.hasData ? t.percentage + '%' : '—'}</strong></td>
      <td>${groupRankHtml}</td>
      <td>${overallRankHtml}</td>
      <td>${gradeHtml}</td>
    `;

    tbody.appendChild(tr);
  });
}

// Populate Printable Official Template for window.print()
function renderPrintableReport(student, summary, testReports) {
  if (!elements.printStudentName) return;

  elements.printStudentName.textContent = student.name;
  elements.printStudentId.textContent = student.studentId;
  elements.printRollNumber.textContent = student.rollNumber;
  elements.printGroup.textContent = student.group;
  elements.printSection.textContent = `Section ${student.section}`;
  elements.printPhone.textContent = student.phoneNumber;
  elements.printCumulativeAvg.textContent = `${summary.cumulativeAverage.toFixed(1)}% (Tests: ${summary.testsAttempted})`;
  elements.printGeneratedDate.textContent = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  const tbody = elements.printMarksTableBody;
  if (!tbody) return;

  tbody.innerHTML = '';
  const conducted = testReports.filter(t => t.hasData);
  const listToPrint = conducted.length > 0 ? conducted : testReports.slice(0, 5);

  listToPrint.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${t.testName}</strong></td>
      <td>${t.hasData && t.subjectScores['Telugu']?.hasScore ? t.subjectScores['Telugu'].scaledMarks : '—'}</td>
      <td>${t.hasData && t.subjectScores['Hindi']?.hasScore ? t.subjectScores['Hindi'].scaledMarks : '—'}</td>
      <td>${t.hasData && t.subjectScores['English']?.hasScore ? t.subjectScores['English'].scaledMarks : '—'}</td>
      <td>${t.hasData && t.subjectScores['Maths']?.hasScore ? t.subjectScores['Maths'].scaledMarks : '—'}</td>
      <td>${t.hasData && t.subjectScores['Physics']?.hasScore ? t.subjectScores['Physics'].scaledMarks : '—'}</td>
      <td>${t.hasData && t.subjectScores['Biology']?.hasScore ? t.subjectScores['Biology'].scaledMarks : '—'}</td>
      <td>${t.hasData && t.subjectScores['Social']?.hasScore ? t.subjectScores['Social'].scaledMarks : '—'}</td>
      <td><strong>${t.hasData ? t.totalMarks : '—'}</strong></td>
      <td><strong>${t.hasData ? t.percentage + '%' : '—'}</strong></td>
      <td>${t.hasData ? '#' + t.groupRank : '—'}</td>
      <td>${t.hasData ? '#' + t.overallRank : '—'}</td>
      <td>${t.hasData ? t.grade : '—'}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Print Official Report Card
function printParentReport() {
  if (!state.parentPortal.reportData) {
    showToast('Please select a student first.', 'error');
    return;
  }
  window.print();
}

// Export Individual Student Report to Excel (.xlsx)
function exportStudentReportToExcel(studentId) {
  if (typeof XLSX === 'undefined') {
    showToast('Excel export library is loading, please try again.', 'error');
    return;
  }

  const data = state.parentPortal.reportData;
  if (!data) {
    showToast('Please select a student first.', 'error');
    return;
  }

  const { student, summary, testReports } = data;
  const rows = [
    ['ZILLA PARISHAD HIGH SCHOOL (ZPHS MLPL)'],
    ['STUDENT ACADEMIC PERFORMANCE & PROGRESS REPORT — ALL TESTS'],
    [],
    ['STUDENT DETAILS:'],
    ['Student Name:', student.name, 'Student ID:', student.studentId],
    ['Roll Number:', student.rollNumber, 'Academic Group:', student.group],
    ['Section:', `Section ${student.section}`, 'Parent Phone:', student.phoneNumber],
    ['Cumulative Average:', `${summary.cumulativeAverage.toFixed(1)}%`, 'Tests Attempted:', `${summary.testsAttempted} of 30`],
    ['Strongest Subject:', summary.bestSubject, 'Focus Area:', summary.weakestSubject],
    ['Generated On:', new Date().toLocaleString()],
    [],
    [
      'Test Name',
      'Telugu (/100)',
      'Hindi (/100)',
      'English (/100)',
      'Maths (/100)',
      'Physics (/50)',
      'Biology (/50)',
      'Social (/100)',
      'Total Marks (/600)',
      'Percentage (%)',
      'Group Rank',
      'School Rank',
      'Grade Status'
    ]
  ];

  testReports.forEach(t => {
    rows.push([
      t.testName,
      t.hasData && t.subjectScores['Telugu']?.hasScore ? t.subjectScores['Telugu'].scaledMarks : '—',
      t.hasData && t.subjectScores['Hindi']?.hasScore ? t.subjectScores['Hindi'].scaledMarks : '—',
      t.hasData && t.subjectScores['English']?.hasScore ? t.subjectScores['English'].scaledMarks : '—',
      t.hasData && t.subjectScores['Maths']?.hasScore ? t.subjectScores['Maths'].scaledMarks : '—',
      t.hasData && t.subjectScores['Physics']?.hasScore ? t.subjectScores['Physics'].scaledMarks : '—',
      t.hasData && t.subjectScores['Biology']?.hasScore ? t.subjectScores['Biology'].scaledMarks : '—',
      t.hasData && t.subjectScores['Social']?.hasScore ? t.subjectScores['Social'].scaledMarks : '—',
      t.hasData ? t.totalMarks : '—',
      t.hasData ? `${t.percentage}%` : '—',
      t.hasData ? `#${t.groupRank} / ${t.totalInGroupInTest}` : '—',
      t.hasData ? `#${t.overallRank} / ${t.totalStudentsInTest}` : '—',
      t.hasData ? t.grade : '—'
    ]);
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);

  ws['!cols'] = [
    { wch: 14 }, // Test
    { wch: 14 }, // Telugu
    { wch: 14 }, // Hindi
    { wch: 14 }, // English
    { wch: 14 }, // Maths
    { wch: 14 }, // Physics
    { wch: 14 }, // Biology
    { wch: 14 }, // Social
    { wch: 18 }, // Total
    { wch: 15 }, // %
    { wch: 16 }, // Group Rank
    { wch: 16 }, // School Rank
    { wch: 22 }  // Grade
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Academic Report');

  const safeName = student.name.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `ZPHS_ReportCard_${student.studentId}_${safeName}.xlsx`;
  XLSX.writeFile(wb, filename);

  showToast(`📥 Downloaded Student Report: ${filename}`, 'success');
}

// Format and Copy WhatsApp Update for Parent
function copyParentWhatsAppSummary() {
  const data = state.parentPortal.reportData;
  if (!data) {
    showToast('Please select a student first.', 'error');
    return;
  }

  const { student, summary, testReports } = data;
  const conducted = testReports.filter(t => t.hasData);

  let msg = `🎓 *ZPHS MLPL HIGH SCHOOL — ACADEMIC PROGRESS REPORT*\n`;
  msg += `--------------------------------------------------\n`;
  msg += `*Student:* ${student.name} (Roll #${student.rollNumber})\n`;
  msg += `*Group:* ${student.group} | *Section:* ${student.section}\n`;
  msg += `*Cumulative Average:* ${summary.cumulativeAverage.toFixed(1)}% (${summary.testsAttempted} Tests Attempted)\n`;
  msg += `*Strongest Subject:* ${summary.bestSubject}\n`;
  if (summary.weakestSubject !== 'N/A') {
    msg += `*Focus Area:* ${summary.weakestSubject}\n`;
  }
  msg += `--------------------------------------------------\n`;
  msg += `*TEST-BY-TEST PERFORMANCE:*\n`;

  if (conducted.length === 0) {
    msg += `No tests recorded yet.\n`;
  } else {
    conducted.forEach(t => {
      msg += `📌 *${t.testName}:* ${t.totalMarks}/600 (${t.percentage}%) | Group Rank: #${t.groupRank} | School Rank: #${t.overallRank} | Grade: ${t.grade}\n`;
    });
  }

  msg += `--------------------------------------------------\n`;
  msg += `_ZPHS MLPL Administration & Teaching Staff_`;

  navigator.clipboard.writeText(msg).then(() => {
    showToast('📱 WhatsApp message copied to clipboard! You can paste and send directly to the parent.', 'success');
  }).catch(() => {
    showToast('Could not copy automatically. Please copy from text box.', 'error');
  });
}

// ================= TAB 3: MANAGE / EDIT / DELETE MARKS =================
function setupManageMarksControls() {
  elements.manageTestSelect.addEventListener('change', () => {
    state.manageFilterTest = elements.manageTestSelect.value;
    loadManageMarks();
  });

  elements.manageStudentSelect.addEventListener('change', () => {
    state.manageFilterStudent = elements.manageStudentSelect.value;
    loadManageMarks();
  });

  elements.manageSearchInput.addEventListener('input', () => {
    state.manageSearchQuery = elements.manageSearchInput.value.toLowerCase().trim();
    renderManageMarksTable();
  });

  elements.resetSampleBtn.addEventListener('click', async () => {
    if (!confirm('Populate/Reset Test-1 sample marks for all 69 students?')) return;
    try {
      const res = await fetch('/api/seed-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testName: 'Test-1' })
      });
      const data = await res.json();
      showToast(data.message, 'success');
      loadManageMarks();
      loadRankings();
    } catch (err) {
      showToast('Reset failed: ' + err.message, 'error');
    }
  });
}

let manageMarksCache = [];

async function loadManageMarks() {
  try {
    let url = '/api/marks?';
    if (state.manageFilterTest) url += `testName=${encodeURIComponent(state.manageFilterTest)}&`;
    if (state.manageFilterStudent) url += `studentId=${encodeURIComponent(state.manageFilterStudent)}`;

    const res = await fetch(url);
    const data = await res.json();
    manageMarksCache = data.marks || [];
    renderManageMarksTable();
  } catch (err) {
    showToast('Failed to load marks records: ' + err.message, 'error');
  }
}

function renderManageMarksTable() {
  let list = [...manageMarksCache];

  if (state.manageSearchQuery) {
    const q = state.manageSearchQuery;
    list = list.filter(m =>
      m.studentId.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.testName.toLowerCase().includes(q) ||
      (m.phoneNumber && m.phoneNumber.includes(q))
    );
  }

  if (list.length === 0) {
    elements.manageTableBody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align: center; padding: 2rem; color: #94a3b8;">
          No marks entries found.
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  list.forEach(m => {
    let groupBadge = 'badge-x';
    if (m.group === 'Group-Y') groupBadge = 'badge-y';
    if (m.group === 'Group-Z') groupBadge = 'badge-z';

    html += `
      <tr>
        <td><strong>${m.testName}</strong></td>
        <td><strong>${m.studentName}</strong></td>
        <td><span class="badge ${groupBadge}">${m.group}</span></td>
        <td><span class="badge badge-sec-${m.section.toLowerCase()}">Sec ${m.section}</span></td>
        <td class="phone-cell">📞 ${m.phoneNumber}</td>
        <td>📖 ${m.subject}</td>
        <td><strong style="font-family: var(--font-mono);">${m.rawMarks}</strong></td>
        <td><span class="badge" style="background:#e2e8f0; color:#334155;">${m.maxMarks}</span></td>
        <td>
          <span style="font-family: var(--font-mono); font-weight: 800; color: #166534;">
            ${m.scaledMarks} / ${getMaxScaledForSubject(m.subject)}
          </span>
        </td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn btn-secondary btn-sm" onclick="openEditModal('${m._id}', '${m.studentName}', '${m.testName}', '${m.subject}', ${m.rawMarks}, ${m.maxMarks})">
              ✏️ Edit
            </button>
            <button class="btn btn-danger btn-sm" onclick="deleteMarkRecord('${m._id}', '${m.studentName}', '${m.subject}')">
              🗑️ Delete
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  elements.manageTableBody.innerHTML = html;
}

// Delete Mark Record
window.deleteMarkRecord = async function(id, studentName, subject) {
  if (!confirm(`Are you sure you want to delete ${studentName}'s marks in ${subject}?`)) return;

  try {
    const res = await fetch(`/api/marks/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete');

    showToast(`Mark for ${studentName} in ${subject} deleted.`, 'success');
    loadManageMarks();
    loadRankings();
  } catch (err) {
    showToast('Delete error: ' + err.message, 'error');
  }
};

// ================= MODAL: EDIT MARKS =================
function setupModalEvents() {
  elements.closeModalBtn.addEventListener('click', closeEditModal);
  elements.cancelModalBtn.addEventListener('click', closeEditModal);

  // Recalculate on edit raw marks input or max change
  elements.editRawMarks.addEventListener('input', updateEditModalPreview);
  document.querySelectorAll('input[name="editMaxMarks"]').forEach(radio => {
    radio.addEventListener('change', updateEditModalPreview);
  });

  elements.editMarkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveEditedMark();
  });
}

window.openEditModal = function(id, studentName, testName, subject, rawMarks, maxMarks) {
  elements.editMarkId.value = id;
  elements.editStudentName.textContent = studentName;
  elements.editTestName.textContent = testName;
  elements.editSubjectName.textContent = subject;
  elements.editRawMarks.value = rawMarks;

  const radio = document.querySelector(`input[name="editMaxMarks"][value="${maxMarks}"]`);
  if (radio) radio.checked = true;

  updateEditModalPreview();
  elements.editModal.classList.remove('hidden');
};

function closeEditModal() {
  elements.editModal.classList.add('hidden');
}

function updateEditModalPreview() {
  const raw = parseFloat(elements.editRawMarks.value) || 0;
  const radio = document.querySelector('input[name="editMaxMarks"]:checked');
  const max = radio ? parseFloat(radio.value) : 20;

  if (raw > max) {
    elements.editScaledPreview.textContent = 'Exceeds Max!';
    elements.editScaledPreview.style.color = '#dc2626';
  } else {
    const sub = elements.editSubjectName ? elements.editSubjectName.textContent : '';
    const targetScale = getMaxScaledForSubject(sub);
    const scaled = Math.round(((raw / max) * targetScale) * 100) / 100;
    elements.editScaledPreview.textContent = `${scaled.toFixed(2)} / ${targetScale}`;
    elements.editScaledPreview.style.color = '#166534';
  }
}

async function saveEditedMark() {
  const id = elements.editMarkId.value;
  const rawMarks = Number(elements.editRawMarks.value);
  const radio = document.querySelector('input[name="editMaxMarks"]:checked');
  const maxMarks = radio ? Number(radio.value) : 20;

  if (rawMarks > maxMarks) {
    showToast(`Marks scored cannot exceed max marks (${maxMarks})`, 'error');
    return;
  }

  try {
    const res = await fetch(`/api/marks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawMarks, maxMarks })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update marks');

    showToast('Marks updated successfully!', 'success');
    closeEditModal();
    loadManageMarks();
    loadRankings();
  } catch (err) {
    showToast('Update error: ' + err.message, 'error');
  }
}

// ================= TAB 4: STUDENTS DIRECTORY =================
function renderDirectoryTable() {
  let html = '';
  state.students.forEach(student => {
    let groupBadge = 'badge-x';
    if (student.group === 'Group-Y') groupBadge = 'badge-y';
    if (student.group === 'Group-Z') groupBadge = 'badge-z';

    html += `
      <tr>
        <td style="font-family: var(--font-mono); font-weight: 700;">#${student.rollNumber}</td>
        <td><strong>${student.studentId}</strong></td>
        <td>${student.name}</td>
        <td><span class="badge ${groupBadge}">${student.group}</span></td>
        <td><span class="badge badge-sec-${student.section.toLowerCase()}">Section ${student.section}</span></td>
        <td class="phone-cell">📞 ${student.phoneNumber}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="quickEnterMarks('${student.studentId}')">
            ✏️ Enter Marks
          </button>
        </td>
      </tr>
    `;
  });

  elements.directoryTableBody.innerHTML = html;
}

// Toast helper
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
