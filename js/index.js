class StickyNavigation {
  constructor() {
    this.tabContainerHeight = 70;
    this.setActiveTab();
    this.checkTabContainerPosition();
    this.setupNavigation();
    this.setupContentAnimation();
    this.setupInitialTransition(); // New method for initial page load transition

    $(window).scroll(() => {
      this.checkTabContainerPosition();
    });
  }

  checkTabContainerPosition() {
    let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
    if ($(window).scrollTop() > offset) {
      $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
    } else {
      $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
    }
  }

  setActiveTab() {
    const currentPath = window.location.pathname.split('/').pop() || 'home.html';
    $('.et-hero-tab').each((_, element) => {
      const href = $(element).attr('href');
      if (href === currentPath) {
        $(element).addClass('active');
        this.setSliderCss($(element));
      } else {
        $(element).removeClass('active');
      }
    });
  }

  setSliderCss(tab) {
    if (tab.length) {
      const containerOffset = $('.et-hero-tabs-container').offset().left;
      const width = tab.outerWidth();
      const left = tab.offset().left - containerOffset;
      $('.et-hero-tab-slider').css({ width, left });
    }
  }

  setupNavigation() {
    $('.et-hero-tab').click(function (e) {
      e.preventDefault();
      const href = $(this).attr('href');
      if (href !== window.location.pathname.split('/').pop()) {
        $('body').addClass('fade-out');
        $('.transition-overlay').addClass('active');
        setTimeout(() => {
          window.location.href = href;
        }, 1800); // 1.8s for navigation transition
      }
    });
  }

  setupContentAnimation() {
    const content = document.querySelector('.content-container');
    if (content) {
      setTimeout(() => {
        content.classList.add('visible');
      }, 1800); // Delay content animation until after initial transition
    }
  }

  setupInitialTransition() {
    // Trigger transition overlay on page load
    $('.transition-overlay').addClass('active');
    $('body').css('opacity', '0'); // Start body hidden
    setTimeout(() => {
      $('.transition-overlay').removeClass('active');
      $('body').css('opacity', '1'); // Fade in body
    }, 1800); // 1.8s to match navigation transition
  }
}

class SholatSteps {
  constructor() {
    this.setupStepButtons();
  }

  setupStepButtons() {
    $('.step-button').click(function () {
      $('.step-button').removeClass('active');
      $('.step-content').removeClass('active');
      $(this).addClass('active');
      const stepId = $(this).data('step');
      $(`#${stepId}`).addClass('active');
    });
  }
}

$(document).ready(function () {
  new StickyNavigation();
  new SholatSteps();
});