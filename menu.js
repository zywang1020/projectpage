(function () {
  // 注入收合動畫與側邊欄樣式（改用寬度歸零收合，避開 sticky 鎖定問題）
  const style = document.createElement('style');
  style.textContent = `
    #sidebar {
      width: 18rem;
      overflow: hidden;
      transition: width 0.3s ease, transform 0.3s ease, border-width 0.3s ease;
    }
    @media (min-width: 1024px) {
      #sidebar.desktop-collapsed {
        width: 0 !important;
        border-right-width: 0 !important;
      }
    }
    @media (max-width: 1023px) {
      #sidebar {
        transform: translateX(-100%) !important;
      }
      #sidebar.mobile-open {
        transform: translateX(0) !important;
      }
    }
    .sidebar-scroll::-webkit-scrollbar { width: 5px; }
    .sidebar-scroll::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 9999px; }
  `;
  document.head.appendChild(style);

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const sidebarHTML = `
    <div id="mobile-backdrop" onclick="toggleSidebar()" class="fixed inset-0 bg-slate-900/40 z-30 hidden lg:hidden"></div>
    <aside id="sidebar" class="fixed lg:sticky top-0 left-0 z-40 h-screen shrink-0 bg-slate-100 border-r border-slate-200">
      <div class="w-72 h-full flex flex-col">
        <div class="flex-1 overflow-y-auto sidebar-scroll p-6 space-y-8">
          <nav>
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-lg font-bold text-slate-800 pb-2 border-b-2 border-teal-600 inline-block tracking-wide">Menu</h2>
              <button onclick="toggleSidebar()" class="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-200" aria-label="關閉選單">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <ul class="divide-y divide-slate-200/80 text-sm">
              <li>
                <a href="index.html" data-page="index.html" class="menu-link block py-3 font-medium text-slate-700 hover:text-teal-600 transition-colors">
                  總覽 Overview
                </a>
              </li>

              <li>
                <button onclick="toggleAccordion('acc-2026', this)" class="w-full text-left py-3 font-medium text-slate-700 hover:text-teal-600 transition-colors flex items-center justify-between">
                  <span>2026 專題與競賽</span>
                  <i data-lucide="chevron-down" class="acc-icon w-4 h-4 text-slate-400 transition-transform duration-200 rotate-180"></i>
                </button>
                <ul id="acc-2026" class="pl-4 pb-2 space-y-1 border-l-2 border-slate-200 ml-1 mb-2">
                  <li><a href="np2026.html" data-page="np2026.html" class="menu-link block py-1.5 text-xs sm:text-sm text-slate-600 hover:text-teal-600 transition-colors">臺灣國家公園保育研討會</a></li>
                  <li><a href="bilingual2026.html" data-page="bilingual2026.html" class="menu-link block py-1.5 text-xs sm:text-sm text-slate-600 hover:text-teal-600 transition-colors">師資生雙語教案競賽</a></li>
                  <li><a href="climate2026.html" data-page="climate2026.html" class="menu-link block py-1.5 text-xs sm:text-sm text-slate-600 hover:text-teal-600 transition-colors">風與綠的空間保衛戰</a></li>
                  <li><a href="gis2026.html" data-page="gis2026.html" class="menu-link block py-1.5 text-xs sm:text-sm text-slate-600 hover:text-teal-600 transition-colors">七家灣溪遙測小論文</a></li>
                </ul>
              </li>

              <li>
                <button onclick="toggleAccordion('acc-2025', this)" class="w-full text-left py-3 font-medium text-slate-700 hover:text-teal-600 transition-colors flex items-center justify-between">
                  <span>2025 專題與競賽</span>
                  <i data-lucide="chevron-down" class="acc-icon w-4 h-4 text-slate-400 transition-transform duration-200 rotate-180"></i>
                </button>
                <ul id="acc-2025" class="pl-4 pb-2 space-y-1 border-l-2 border-slate-200 ml-1 mb-2">
                  <li><a href="climate2025.html" data-page="climate2025.html" class="menu-link block py-1.5 text-xs sm:text-sm text-slate-600 hover:text-teal-600 transition-colors">氣候變遷創意實作｜熱感偵探</a></li>
                </ul>
              </li>

              <li>
                <a href="https://www.zhengyiwang.com/" class="py-3 font-medium text-slate-700 hover:text-teal-600 transition-colors flex items-center justify-between">
                  <span>返回個人主站</span>
                  <i data-lucide="external-link" class="w-3.5 h-3.5 text-slate-400"></i>
                </a>
              </li>
            </ul>
          </nav>

          <section class="pt-4 border-t border-slate-200">
            <h2 class="text-base font-bold text-slate-800 pb-2 border-b-2 border-teal-600 inline-block mb-4">Get in touch</h2>
            <ul class="space-y-3 text-xs text-slate-600">
              <li class="flex items-start gap-2.5">
                <i data-lucide="mail" class="w-4 h-4 text-teal-600 shrink-0 mt-0.5"></i>
                <a href="mailto:zhengyi1020@ntnu.edu.tw" class="hover:text-teal-600 break-all">zhengyi1020@ntnu.edu.tw</a>
              </li>
              <li class="flex items-start gap-2.5">
                <i data-lucide="globe" class="w-4 h-4 text-teal-600 shrink-0 mt-0.5"></i>
                <a href="https://www.zhengyiwang.com/" class="hover:text-teal-600">zhengyiwang.com</a>
              </li>
              <li class="flex items-start gap-2.5">
                <i data-lucide="book-marked" class="w-4 h-4 text-teal-600 shrink-0 mt-0.5"></i>
                <a href="https://orcid.org/0009-0009-7877-4798" target="_blank" class="hover:text-teal-600">ORCID: 0009-0009-7877-4798</a>
              </li>
            </ul>
          </section>
        </div>

        <div class="px-6 py-4 border-t border-slate-200 text-[11px] text-slate-400">
          © 2026 Zheng-Yi Wang.
        </div>
      </div>
    </aside>
  `;

  const layout = document.getElementById('app-layout');
  if (layout) {
    layout.insertAdjacentHTML('afterbegin', sidebarHTML);
  }

  document.querySelectorAll('.menu-link').forEach(link => {
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('text-teal-600', 'font-bold');
    }
  });

  window.toggleSidebar = function () {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('mobile-backdrop');
    if (window.innerWidth >= 1024) {
      sidebar.classList.toggle('desktop-collapsed');
    } else {
      sidebar.classList.toggle('mobile-open');
      backdrop.classList.toggle('hidden');
    }
  };

  window.toggleAccordion = function (id, btn) {
    const submenu = document.getElementById(id);
    const icon = btn.querySelector('.acc-icon');
    submenu.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
  };

  if (window.lucide) {
    lucide.createIcons();
  }
})();
