// ELES COSMÉTICOS — render y filtros del catálogo
(function(){
  var grid = document.getElementById('catalogGrid');
  var empty = document.getElementById('emptyState');
  var search = document.getElementById('searchInput');
  var chips = document.querySelectorAll('#categoryFilters .chip');

  var state = { cat: 'todos', q: '' };

  function waLink(p){
    var msg = 'Hola! Quiero consultar por ' + p.name + ' de ' + p.brand;
    return 'https://wa.me/5492262409156?text=' + encodeURIComponent(msg);
  }

  function initials(brand){
    return brand.split(' ').map(function(w){ return w[0]; }).join('').slice(0,2).toUpperCase() + '.';
  }

  function render(){
    if(!grid || typeof ELES_PRODUCTS === 'undefined') return;
    var q = state.q.trim().toLowerCase();
    var items = ELES_PRODUCTS.filter(function(p){
      var catOk = state.cat === 'todos' || p.category === state.cat;
      var qOk = !q || (p.name.toLowerCase().indexOf(q) > -1 || p.brand.toLowerCase().indexOf(q) > -1);
      return catOk && qOk;
    });

    grid.innerHTML = items.map(function(p){
      var figure = p.img
        ? '<img src="' + p.img + '" alt="' + p.brand + ' ' + p.name + '">'
        : '<span class="ph-mark">' + initials(p.brand) + '</span>';
      return (
        '<article class="prod-card">' +
          '<div class="prod-figure">' + figure + '</div>' +
          '<div>' +
            '<span class="prod-brand">' + p.brand + '</span>' +
            '<h3 class="prod-name">' + p.name + '</h3>' +
          '</div>' +
          '<div class="prod-foot">' +
            '<span class="prod-price">' + (p.note || 'Consultar') + '</span>' +
            '<a class="text-link" style="font-size:.65rem" href="' + waLink(p) + '" target="_blank" rel="noopener">Consultar</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    // completa la última fila con celdas vacías para que no quede
    // un bloque de color suelto (la grilla usa columnas fijas por breakpoint)
    var cols = window.innerWidth >= 960 ? 4 : (window.innerWidth >= 640 ? 3 : 2);
    var remainder = items.length % cols;
    if(items.length && remainder){
      var fillers = cols - remainder;
      for(var i=0;i<fillers;i++){
        grid.innerHTML += '<div class="prod-card" aria-hidden="true" style="background:var(--paper)"></div>';
      }
    }

    empty.classList.toggle('is-visible', items.length === 0);
  }

  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      chips.forEach(function(c){ c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      state.cat = chip.getAttribute('data-cat');
      render();
    });
  });

  if(search){
    search.addEventListener('input', function(){
      state.q = search.value;
      render();
    });
  }

  // preselecciona categoría vía ?cat= en la URL
  var params = new URLSearchParams(window.location.search);
  var catParam = params.get('cat');
  if(catParam){
    chips.forEach(function(c){
      var match = c.getAttribute('data-cat') === catParam;
      c.classList.toggle('is-active', match);
      if(match) state.cat = catParam;
    });
  }

  render();
})();
