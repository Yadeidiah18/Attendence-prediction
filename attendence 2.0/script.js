const form = document.getElementById('attendanceForm');
const resultBox = document.getElementById('result');
const totalClassesInput = document.getElementById('totalClasses');
const presentClassesInput = document.getElementById('presentClasses');
const tracker = document.getElementById('tracker');
const emptyState = document.getElementById('emptyState');
const percentageOutput = document.getElementById('percentage');
const summaryText = document.getElementById('summaryText');
const classCount = document.getElementById('classCount');
const progressBar = document.getElementById('progressBar');
const progressTrack = document.querySelector('.progress-track');

const minimumAttendance = 75;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const total = Number(totalClassesInput.value);
  const attended = Number(presentClassesInput.value);

  if (!Number.isInteger(total) || !Number.isInteger(attended) || total <= 0 || attended < 0) {
    window.alert('Enter a positive whole number of classes held and a non-negative whole number of classes attended.');
    return;
  }

  if (attended > total) {
    window.alert('Classes attended cannot be greater than classes held.');
    return;
  }

  const percentage = (attended / total) * 100;
  const requiredMoreClasses = Math.max(
    0,
    Math.ceil((minimumAttendance * total - 100 * attended) / (100 - minimumAttendance))
  );

  percentageOutput.textContent = `${percentage.toFixed(2)}%`;
  progressBar.style.width = `${Math.min(percentage, 100)}%`;
  progressTrack.setAttribute('aria-valuenow', String(Math.min(percentage, 100)));
  classCount.textContent = `${attended} attended out of ${total} classes`;

  if (requiredMoreClasses > 0) {
    summaryText.textContent = `Below the ${minimumAttendance}% requirement.`;
    resultBox.innerHTML = `<p>Attend the next <strong>${requiredMoreClasses} classes</strong> without missing any to reach ${minimumAttendance}%.</p>`;
    resultBox.className = 'result bad';
  } else {
    summaryText.textContent = `Meeting the ${minimumAttendance}% requirement.`;
    resultBox.innerHTML = `<p>You are meeting the ${minimumAttendance}% requirement.</p>`;
    resultBox.className = 'result good';
  }

  tracker.hidden = false;
  emptyState.hidden = true;
});
