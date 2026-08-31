/**
 * Product specification modal
 */
const vbiProducts = {
  hollow: {
    title: 'Hollow Blocks',
    description:
      'Lightweight and practical concrete blocks designed for a wide range of walling and partition applications.',
    image: 'assets/images/products/hollow-block.png',
    type: 'Hollow Concrete Block',
    size: 'Confirm with VBI',
    application: 'Walling & Partition Applications',
  },
  solid: {
    title: 'Solid Blocks',
    description:
      'Robust concrete blocks suitable for applications where durability and structural performance are important.',
    image: 'assets/images/products/solid-block.png',
    type: 'Solid Concrete Block',
    size: 'Confirm with VBI',
    application: 'Structural & General Construction',
  },
  thermal: {
    title: 'Insulated / Thermal Blocks',
    description:
      'Block solutions designed to support energy-conscious building requirements and improved thermal performance.',
    image: 'assets/images/products/thermal-block.png',
    type: 'Insulated / Thermal Block',
    size: 'Confirm with VBI',
    application: 'Thermal Walling',
  },
  hourdi: {
    title: 'Hourdi Blocks',
    description:
      'Specialized concrete blocks used in suitable ribbed slab construction systems.',
    image: 'assets/images/products/hourdi-block.png',
    type: 'Hourdi Block',
    size: 'Confirm with VBI',
    application: 'Ribbed Slab Construction',
  },
  paving: {
    title: 'Paving Blocks / Interlocks',
    description:
      'Durable paving solutions for outdoor areas, walkways, landscaping and other suitable applications.',
    image: 'assets/images/products/paving-block.png',
    type: 'Concrete Paving Block',
    size: 'Confirm with VBI',
    application: 'Paving & Landscaping',
  },
  kerbstone: {
    title: 'Kerbstones',
    description:
      'Practical concrete kerbstone solutions for roads, pathways, landscaping and site development applications.',
    image: 'assets/images/products/kerbstone.png',
    type: 'Concrete Kerbstone',
    size: 'Confirm with VBI',
    application: 'Roads & Landscaping',
  },
};

function openSpec(product) {
  const data = vbiProducts[product];
  if (!data) return;

  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalDescription').textContent = data.description;
  document.getElementById('modalImage').src = data.image;
  document.getElementById('modalImage').alt = data.title;
  document.getElementById('modalType').textContent = data.type;
  document.getElementById('modalSize').textContent = data.size;
  document.getElementById('modalApplication').textContent = data.application;

  document.getElementById('vbiModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSpec() {
  document.getElementById('vbiModal').classList.remove('active');
  document.body.style.overflow = '';
}

export function initProducts() {
  document.querySelectorAll('[data-spec]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openSpec(btn.dataset.spec);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      closeSpec();
    });
  });

  const modal = document.getElementById('vbiModal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSpec();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSpec();
  });
}
