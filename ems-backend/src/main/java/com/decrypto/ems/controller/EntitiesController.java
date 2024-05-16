package com.decrypto.ems.controller;

import com.decrypto.ems.dto.MercadoDto;
import com.decrypto.ems.dto.ComitenteDto;
import com.decrypto.ems.dto.PaisDto;
import com.decrypto.ems.dto.StatsDto;
import com.decrypto.ems.service.EntitiesService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api")

public class EntitiesController {

    private EntitiesService entitiesService;

    @GetMapping("stats")
    public ResponseEntity<List<StatsDto>> getStats(){
        List<StatsDto> stats = entitiesService.getStats();
        return ResponseEntity.ok(stats);
    }

    @PostMapping("comitentes")
    public ResponseEntity<ComitenteDto> createComitente(@RequestBody ComitenteDto comitenteDto) {
        ComitenteDto savedComitente = entitiesService.createComitente(comitenteDto);
        return new ResponseEntity<>(savedComitente, HttpStatus.CREATED);
    }

    @GetMapping("comitentes/{id}")
    public ResponseEntity<ComitenteDto> getComitenteById(@PathVariable("id") Long comitenteId) {
        ComitenteDto comitenteDto = entitiesService.getComitenteById(comitenteId);
        return ResponseEntity.ok(comitenteDto);
    }

    @GetMapping("comitentes")
    public ResponseEntity<List<ComitenteDto>> getAllComitentes(){
        List<ComitenteDto> allComitentes = entitiesService.getAllComitentes();
        return ResponseEntity.ok(allComitentes);
    }

    @PutMapping("comitentes/{id}")
    public ResponseEntity<ComitenteDto> updateComitente(@PathVariable("id") Long comitenteId,
                                                        @RequestBody ComitenteDto updatedComitente) {
        ComitenteDto comitenteDto = entitiesService.updateComitente(comitenteId, updatedComitente);
        return ResponseEntity.ok(comitenteDto);
    }

    @DeleteMapping("comitentes/{id}")
    public ResponseEntity<String> deleteComitente(@PathVariable("id") Long comitenteId) {
        entitiesService.deleteComitente(comitenteId);
        return ResponseEntity.ok("Comitente " + comitenteId + " fue borrado.");
    }

    @PostMapping("paises")
    public ResponseEntity<PaisDto> createPais(@RequestBody PaisDto paisDto) {
        PaisDto savedPais = entitiesService.createPais(paisDto);
        return new ResponseEntity<>(savedPais, HttpStatus.CREATED);
    }

    @GetMapping("paises/{id}")
    public ResponseEntity<PaisDto> getPaisById(@PathVariable("id") Long paisId) {
        PaisDto paisDto = entitiesService.getPaisById(paisId);
        return ResponseEntity.ok(paisDto);
    }

    @GetMapping("paises")
    public ResponseEntity<List<PaisDto>> getAllPaises(){
        List<PaisDto> allPaises = entitiesService.getAllPaises();
        return ResponseEntity.ok(allPaises);
    }

    @PutMapping("paises/{id}")
    public ResponseEntity<PaisDto> updatePais(@PathVariable("id") Long paisId,
                                              @RequestBody PaisDto updatedPais) {
        PaisDto paisDto = entitiesService.updatePais(paisId, updatedPais);
        return ResponseEntity.ok(paisDto);
    }

    @DeleteMapping("paises/{id}")
    public ResponseEntity<String> deletePais(@PathVariable("id") Long paisId) {
        entitiesService.deletePais(paisId);
        return ResponseEntity.ok("Pais " + paisId + " fue borrado.");
    }

    @PostMapping("mercados")
    public ResponseEntity<MercadoDto> createMercado(@RequestBody MercadoDto mercadoDto) {
        MercadoDto savedMercado = entitiesService.createMercado(mercadoDto);
        return new ResponseEntity<>(savedMercado, HttpStatus.CREATED);
    }

    @GetMapping("mercados/{id}")
    public ResponseEntity<MercadoDto> getMercadoById(@PathVariable("id") Long mercadoId) {
        MercadoDto mercadoDto = entitiesService.getMercadoById(mercadoId);
        return ResponseEntity.ok(mercadoDto);
    }

    @GetMapping("mercados")
    public ResponseEntity<List<MercadoDto>> getAllMercados(){
        List<MercadoDto> allMercados = entitiesService.getAllMercados();
        return ResponseEntity.ok(allMercados);
    }

    @PutMapping("mercados/{id}")
    public ResponseEntity<MercadoDto> updateMercado(@PathVariable("id") Long mercadoId,
                                                    @RequestBody MercadoDto updatedMercado) {
        MercadoDto mercadoDto = entitiesService.updateMercado(mercadoId, updatedMercado);
        return ResponseEntity.ok(mercadoDto);
    }

    @DeleteMapping("mercados/{id}")
    public ResponseEntity<String> deleteMercado(@PathVariable("id") Long mercadoId) {
        entitiesService.deleteMercado(mercadoId);
        return ResponseEntity.ok("Mercado " + mercadoId + " fue borrado.");
    }
}
