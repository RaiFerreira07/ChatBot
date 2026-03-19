using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

public class ChatController : Controller
{
    private readonly OllamaService _ollamaService;

    public ChatController(OllamaService ollamaService)
    {
        _ollamaService = ollamaService;
    }

    [HttpPost]
    public async Task<IActionResult> EnviarPergunta(string pergunta)
    {
        var resposta = await _ollamaService.PerguntarMistral(pergunta);
        return Content(resposta);
    }

    public IActionResult Index()
    {
        return View();
    }
}