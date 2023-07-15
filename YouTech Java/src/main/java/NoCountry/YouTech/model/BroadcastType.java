/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package NoCountry.YouTech.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Jimy
 */
@Entity
@Table(name = "broadcast_type")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "BroadcastType.findAll", query = "SELECT b FROM BroadcastType b")
    , @NamedQuery(name = "BroadcastType.findByIdBroadcastType", query = "SELECT b FROM BroadcastType b WHERE b.idBroadcastType = :idBroadcastType")
    , @NamedQuery(name = "BroadcastType.findByDescription", query = "SELECT b FROM BroadcastType b WHERE b.description = :description")
    , @NamedQuery(name = "BroadcastType.findByStatus", query = "SELECT b FROM BroadcastType b WHERE b.status = :status")})
public class BroadcastType implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_broadcast_type")
    private Integer idBroadcastType;
    @Basic(optional = false)
    @Column(name = "description")
    private String description;
    @Basic(optional = false)
    @Column(name = "status")
    private short status;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idBroadcastType", fetch = FetchType.LAZY)
    private List<BroadcastMedium> broadcastMediumList;

    public BroadcastType() {
    }

    public BroadcastType(Integer idBroadcastType) {
        this.idBroadcastType = idBroadcastType;
    }

    public BroadcastType(Integer idBroadcastType, String description, short status) {
        this.idBroadcastType = idBroadcastType;
        this.description = description;
        this.status = status;
    }

    public Integer getIdBroadcastType() {
        return idBroadcastType;
    }

    public void setIdBroadcastType(Integer idBroadcastType) {
        this.idBroadcastType = idBroadcastType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public short getStatus() {
        return status;
    }

    public void setStatus(short status) {
        this.status = status;
    }

    @XmlTransient
    public List<BroadcastMedium> getBroadcastMediumList() {
        return broadcastMediumList;
    }

    public void setBroadcastMediumList(List<BroadcastMedium> broadcastMediumList) {
        this.broadcastMediumList = broadcastMediumList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idBroadcastType != null ? idBroadcastType.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof BroadcastType)) {
            return false;
        }
        BroadcastType other = (BroadcastType) object;
        if ((this.idBroadcastType == null && other.idBroadcastType != null) || (this.idBroadcastType != null && !this.idBroadcastType.equals(other.idBroadcastType))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "NoCountry.YouTech.model.BroadcastType[ idBroadcastType=" + idBroadcastType + " ]";
    }
    
}
