import { $ } from './helper.js';
import { cardComponent } from './card.js';

const bosses = [];
const [initializeCardOne] = cardComponent('#result_one');
const [initializeCardTwo] = cardComponent('#result_two');

const apiGetBosses = (limit = 100, page = 0) => {
  return fetch('https://eldenring.fanapis.com/api/bosses?limit=' + limit + '&page=' + page)
        .then(response => response.json());
} 

const getBoss = (id) => bosses.find(boss => boss.id === id);

const setCard = (value, initializeFunction) => {
  const boss = getBoss(value);
  initializeFunction(boss.name, boss.image, boss.location, boss.description, boss.healthPoints);
};

const initialize = async () =>  {  
  const response = [...(await apiGetBosses(100,0)).data, ...(await apiGetBosses(100,1)).data];
  bosses.push(...response);
  let html = '';
  for (const boss of bosses) 
    html += '<option value="' + boss.id +'" ' + (bosses.indexOf(boss) === 4 ? "selected" : "") + '>' + boss.name + '</option>';
  $('#select_one').innerHTML = html;
  $('#select_two').innerHTML = html;
  setCard(bosses[4].id, initializeCardOne);
  setCard(bosses[4].id, initializeCardTwo);
}

window.onload = async () => {
  await initialize();  
  $('#select_one').onchange = function() { 
    setCard(this.value, initializeCardOne);
  };
  $('#select_two').onchange = function() { 
    setCard(this.value, initializeCardTwo);
  };
};

