const projects = [];

const bulletPosition = [
  'translate(15vh, 6vh)',
  'translate(7vh, 11vh)',
  'translate(7vh, 19vh)',
  'translate(15vh, 24vh)',
  'translate(23vh, 19vh)',
  'translate(23vh, 11vh)'
];

const itemHighlightColor = '#FFF7B2';
const maxBulletAmount = bulletPosition.length;
const bulletHolderAngle = 360 / maxBulletAmount;
const spins = 5;
const rotationSpeed = 7;



function addProject(name, projectList, bullets) {
  if (!name) {
    alert('Please, add name for your project');
    return false;
  }

  if (projects.indexOf(name) !== -1) {
    alert(`Project with name ${name} already in the list, choose another one`);
    return false;
  }

  const item = document.createElement('li');

  projects.push(name);
  item.innerText = name;
  projectList.appendChild(item);
  bullets[projects.length - 1].innerHTML = name[0].toLocaleUpperCase();
  bullets[projects.length - 1].style.transform = bulletPosition[projects.length - 1];

  document.getElementById('load-sound').play();

  return true;
}

(function () {
  const projectName = document.getElementById('project-name');
  const projectList = document.getElementById('projects');
  const roulette = document.getElementsByClassName('revolver')[0];
  const bullets = document.getElementsByClassName('bullet');

  document.getElementById('add-project').addEventListener('click', function () {
    if (!addProject(projectName.value, projectList, bullets)) {
      return;
    }

    projectName.value = '';

    if (projects.length >= maxBulletAmount) {
      this.disabled = true;
      projectName.disabled = true;
    } else {
      projectName.focus();
    }
  });

  document.getElementById('choose').addEventListener('click', function () {
    document.getElementById('add-project').disabled = true;
    projectName.disabled = true;
    this.disabled = true;

    if (projects.length < 6) {
      for (let projectsIndex = projects.length; projectsIndex < 6; projectsIndex++) {
        addProject(`empty-${projectsIndex}`, projectList, bullets);
      }
    }

    const list = document.querySelectorAll('#projects li');
    const projectIndex = Math.floor(Math.random() * projects.length);

    const stopAngle = spins * 360 + bulletHolderAngle * projectIndex;
    let angle = 0;
    (function rotate() {
      angle += rotationSpeed;
      roulette.style.transform = `rotate(${angle}deg)`;
      for (let bulletIndex = 0; bulletIndex < bullets.length; bulletIndex++) {
        bullets[bulletIndex].style.transform = `${bulletPosition[bulletIndex]} rotate(${-angle}deg)`;
      }

      const index = Math.round((angle % 360) / bulletHolderAngle) % projects.length;

      if (index >= 1) {
        list[index - 1].style.background = '';
      } else {
        list[projects.length - 1].style.background = '';
      }

      list[index].style.background = itemHighlightColor;

      if (Math.abs(angle - stopAngle) < rotationSpeed) {
        document.getElementById('shot-sound').play();
        return;
      }

      window.requestAnimationFrame(rotate);
    })();
  });
})();
