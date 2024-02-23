document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const timeline = document.getElementById('timeline');
    const mainLine = document.querySelector('.main-line');
    const labelsContainer = document.getElementById('labels');
  
    video.addEventListener('timeupdate', updateTimeline);
  
    function updateTimeline() {
      const percentage = (video.currentTime / video.duration) * 100;
      timeline.style.width = percentage + '%';
      mainLine.style.left = percentage + '%';
    }
  
    function updateLabels() {
      labelsContainer.innerHTML = '';
  
      const duration = video.duration;
      const interval = duration > 60 ? 10 : 5; // Adjust label interval based on video duration
  
      for (let i = 0; i <= duration; i += interval) {
        const label = document.createElement('div');
        label.textContent = formatTime(i);
        label.style.width = (interval / duration) * 100 + '%';
        labelsContainer.appendChild(label);
      }
    }
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
  
    updateLabels();
  });
  