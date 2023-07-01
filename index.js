import { $ } from './helper.js';

const bosses = [];

const setData = () =>  {  
  fetch('https://eldenring.fanapis.com/api/bosses?limit=100')
  .then(response => response.json())
  .then(json => {
    bosses.push(...json.data);
    let html = '';
    for (const boss of bosses) 
      html += '<option value="' + boss.id +'" ' + (bosses.indexOf(boss) === 4 ? "selected" : "") + '>' + boss.name + '</option>';
    $('#select_one').innerHTML = html;
    $('#select_two').innerHTML = html;
    setResult(bosses[4].id, '#result_one');
    setResult(bosses[4].id, '#result_two');
  });
}

const card = (name, image, location, description, healthPoints) => `
    <div class="card">
      <div class="card-image">
        <div class="image">
          <div class="image-container" style="background-image: url('${image}');"></div>
        </div>
      </div>
      <div class="card-content">
        <div class="healt-container">
          <span>&#10084 ${healthPoints}</span>
        </div>
        <div class="media">
          <div class="media-content has-text-centered">
            <p class="title is-4">${name}</p>
            <p class="subtitle is-6">${location}</p>
          </div>
        </div>
        <div class="content">
          <p>${description}</p>
        </div>
      </div>
    </div>
`;

const getBoss = (id) => bosses.find(boss => boss.id === id);

const setResult = (value, element) => {
  const boss = getBoss(value);
  $(element).innerHTML = card(boss.name, boss.image, boss.location, boss.description, boss.healthPoints);
};

window.onload = () => {
  setData();  
  $('#select_one').onchange = function() { 
    setResult(this.value, '#result_one');
  };
  $('#select_two').onchange = function() { 
    setResult(this.value, '#result_two');
  };
};

