document.addEventListener("DOMContentLoaded", (event) => {
	const body = document.getElementsByTagName("body")[0];
	const menu = document.getElementById("menu");
	const menu_buttons = menu.getElementsByTagName("button");
	const header = document.getElementsByTagName("header")[0];
	const header_buttons = header.getElementsByTagName("button");
	const carrousel = document.getElementById("section-carrousel");
	let params = new URLSearchParams(document.location.search);
	let selected_page = params.get("page") ?? 0;

	open_menu = function(){
		menu.style.left = 0;
		document.querySelector("html").style.overflowY = "hidden";
	}
	close_menu = function(){
		menu.style.left = "-100vw";
		document.querySelector("html").style.overflowY = "auto";
	}
	select_section = function(page){
		header_buttons[selected_page].className = "";
		menu_buttons[selected_page].className = "";
		header_buttons[page].className = "active";
		menu_buttons[page].className = "active";
		selected_page = page;
		carrousel.style.transform = `translate(${page*-100}vw)`
		if(window.innerWidth <= 774){
			carrousel.style.height = carrousel.children[page].offsetHeight + "px";
		}
		else{
			carrousel.style.height = "calc(100svh - 225px)";
		}
		tempUrl = new URL(window.location.href);
		tempUrl.searchParams.set("page", selected_page)
		window.history.pushState({}, '', tempUrl.toString());
		close_menu();
	}

	copy_text = function(text, element_name){
		navigator.clipboard.writeText(text.innerHTML);
		show_popup(element_name);
	}

	show_popup = function(element_name){
		const popup = document.createElement("div");
		popup.className = "popup";
		popup.innerHTML = `${element_name} copié(e) dans votre presse-papier.`
		body.append(popup);
		popup.style.bottom = `-${popup.offsetHeight}px`;
		setTimeout(() => {
			popup.style.bottom = "150px";
		}, 50);
		setTimeout(() => {
			popup.style.bottom = `-${popup.offsetHeight}px`;
			setTimeout(() => {
				popup.remove();
			}, 250);
		}, 4000);
		
	}

	download_cv = function(){
		const link = document.createElement("a");
		link.href = "pdf/main.pdf";
		link.download = "CV_Kilian_COULON-DEPUCCIO.pdf";
		link.click();
	}

	window.addEventListener("resize", () => {
		if(window.innerWidth <= 774){
			carrousel.style.height = carrousel.children[selected_page].offsetHeight + "px";
		}
		else{
			carrousel.style.height = "calc(100svh - 225px)";
		}
	});

	header_buttons[selected_page].className = "active";
	menu_buttons[selected_page].className = "active";
	
});