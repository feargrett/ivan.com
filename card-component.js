export const cardComponent = (element) => {
  let _element = element;
  let _name;
  let _image;
  let _location;
  let _description;
  let _healthPoints;

  const component = () => `<div class="card">
    <div class="card-image">
      <div class="image">
        <div class="image-container" style="background-image: url('${_image}');"></div>
      </div>
    </div>
    <div class="card-content">
      <div class="healt-container">
        <span>&#10084 ${_healthPoints}</span>
      </div>
      <div class="media">
        <div class="media-content has-text-centered">
          <p class="title is-4">${_name}</p>
          <p class="subtitle is-6">${_location}</p>
        </div>
      </div>
      <div class="content">
        <p>${_description}</p>
      </div>
    </div>
  </div>`;

  const refreshComponent = () => $(_element).innerHTML = component();
  
  const initialize = (name, image, location, description, healthPoints) => {
    _name = name;
    _image = image;
    _location = location;
    _description = description;
    _healthPoints = healthPoints;
     refreshComponent();
  }

  const setName = (name) => {
    _name = name;
    refreshComponent();
  }
  
  return [initialize, setName];
};