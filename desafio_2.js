window.addEventListener('load', start);
let ListUser = [];
let SearchNames = null;
let filtro = [];
let listfilter = null;
let UserTotal = null;
let UserFemale = null;
let UserMale = null;
let filterFemale = null;
let filterMale = null;
let filterage = null;
let SunAge = null;
function start() {
  preventformsubmit();
  SearchNames = document.querySelector('.text1');

  FetchUser();
  captureSearchNames();
}
function preventformsubmit() {
  function handlesubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('.classform1');
  form.addEventListener('submit', handlesubmit);
}

async function FetchUser() {
  const FetchData = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  json = await FetchData.json();
  ListUser = json.results.map((person) => {
    const { gender, name, dob, picture } = person;
    return {
      gender: gender,
      contador: 1,
      fullname: `${name.first} ${name.last}`,
      age: dob.age,
      ing: picture.thumbnail,
    };
  });
  console.log(ListUser);
}

function captureSearchNames() {
  SearchNames.addEventListener('keyup', inputCapture);

  function inputCapture(event) {
    if (event.key === 'Enter') {
      listfilter = event.target.value.toLowerCase();

      filtro = ListUser.filter((person) => {
        let toLowerCase = person.fullname.toLowerCase();
        return toLowerCase.includes(listfilter);
      });
      filterFemale = filtro.filter((person) => {
        return person.gender === 'female';
      });
      filterMale = filtro.filter((person) => {
        return person.gender === 'male';
      });
      countUser();
      render();
    }
  }
  function countUser() {
    UserTotal = filtro.reduce((accumulator, current) => {
      return accumulator + current.contador;
    }, 0);
    UserFemale = filterFemale.reduce((accumulator, current) => {
      return accumulator + current.contador;
    }, 0);
    UserMale = filterMale.reduce((accumulator, current) => {
      return accumulator + current.contador;
    }, 0);
    SunAge = filtro.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0);
    let changeTitle = document.querySelector('#divtitle');
    changeTitle.textContent = `${UserTotal} ` + 'Usuários Encontrado';
    let changeStatistic = document.querySelector('#divstatistic');
    changeStatistic.textContent = 'Estatíscas Encontradas';
  }
}

function render() {
  var renderstatistic = document.querySelector('.statistic1');
  var rendercapt = document.querySelector('.name2');
  rendercapt.innerHTML = `
    ${filtro
      .map((itens) => {
        return `<div class="UserSpace">
        <div class ="img-box"><img src='${itens.ing}' id ="UserEdit"/>
        <div class ="flex-box">${itens.fullname}, ${itens.age} Anos</div></div></div>`;
      })
      .join('')}
   `;
  renderstatistic.innerHTML = `
      Usuários do Sexo Masculino: ${UserMale}<br>Usuários do Sexo Feminino: ${UserFemale}
      <br>Soma De todas As Idades: ${SunAge}<br> Média de Todas As Idades: ${
    SunAge / UserTotal
  } 
   `;
}
